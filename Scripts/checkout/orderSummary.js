import {cart, removeFromCart, updateQuantity, updateDeliveryOption, updateCartQunatity} from '../../data/cart.js';
import {products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary () {

  let cartSummaryHTML = '';

  let cartQuantity = updateCartQunatity();

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );  

    cartSummaryHTML +=
    `
      <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date" id="delivery-date-${matchingProduct.id}">
          Delivery date: ${ dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <div class="is-editing-quantity">
                <label for="quantity-input-${matchingProduct.id}">
                  Quantity: 
                </label>
                <input class="quantity-input" id="quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
              </div>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML (matchingProduct,  cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');  
      const priceString = deliveryOption.priceCents === 0 
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html +=
      `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML
  ;

  document.querySelector('.js-cart-total-quantity')
    .innerText = `${cartQuantity} Items`
  ;

  document.querySelectorAll('.quantity-input')
    .forEach((input) => {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const productId = input.id;
          input.parentElement.style.display = 'none';
          input.parentElement.nextElementSibling.style.display = 'initial';
          input.parentElement.previousElementSibling.style.display = 'initial';
          updateQuantity(productId, input.value);
        }
      });
    });
  ;  

  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        link.style.display = 'none';
        link.previousElementSibling.style.display = 'initial';
        link.previousElementSibling.previousElementSibling.style.display = 'none';
        const quantityInput = document.getElementById(`quantity-input-${productId}`);
        cart.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            quantityInput.value = cartItem.quantity;
          }
        }); 
        quantityInput.focus();

        quantityInput.addEventListener('blur', () => {
          link.style.display = 'initial';
          link.previousElementSibling.style.display = 'none';
          link.previousElementSibling.previousElementSibling.style.display = 'initial';
          updateQuantity(productId, quantityInput.value);
          let totalQuantity = 0;
          cart.forEach((cartItem) => {
            totalQuantity += cartItem.quantity;
          });
          cartQuantity = totalQuantity;
          renderOrderSummary();
          renderPaymentSummary();
        }); 
        
      }); 
    });
  ;


  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`)
          .remove()
        ;
        let totalQuantity = 0;
        cart.forEach((cartItem) => {
          totalQuantity += cartItem.quantity;
        });
        cartQuantity = totalQuantity;

        document.querySelector
        ('.js-cart-total-quantity')
          .innerText = `${cartQuantity} Items`
        ;
      });
    });
  ;

  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      option.addEventListener('click', () => {
        const {productId, deliveryOptionId} = option.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
  ;

  document.querySelector
  ('.js-cart-total-quantity')
    .innerText = `${cartQuantity} Items`
  ;
}
