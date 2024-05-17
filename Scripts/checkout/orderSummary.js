import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption,calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
  
export function renderOrderSummary () {

  let cartSummaryHTML = '';

  let cartQuantity = cart.updateCartQunatity();

  cart.cartItems.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML +=
    `
      <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date" id="delivery-date-${matchingProduct.id}">
          Delivery date: ${ dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name 
            js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
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
              <span class="delete-quantity-link 
              link-primary js-delete-link 
              js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
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

      const dateString = calculateDeliveryDate(deliveryOption);  
      const priceString = deliveryOption.priceCents === 0 
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html +=
      `
        <div class="delivery-option js-delivery-option
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input js-delivery-input-${matchingProduct.id}-${deliveryOption.id}"
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
          cart.updateQuantity(productId, input.value);
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
        cart.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            quantityInput.value = cartItem.quantity;
          }
        }); 
        quantityInput.focus();

        quantityInput.addEventListener('blur', () => {
          link.style.display = 'initial';
          link.previousElementSibling.style.display = 'none';
          link.previousElementSibling.previousElementSibling.style.display = 'initial';
          cart.updateQuantity(productId, quantityInput.value);
          let totalQuantity = 0;
          cart.cartItems.forEach((cartItem) => {
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
        cart.removeFromCart(productId);

        let totalQuantity = 0;
        cart.cartItems.forEach((cartItem) => {
          totalQuantity += cartItem.quantity;
        });
        cartQuantity = totalQuantity;

        renderOrderSummary();
        renderPaymentSummary();
      });
    });
  ;

  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      option.addEventListener('click', () => {
        const {productId, deliveryOptionId} = option.dataset;
        cart.updateDeliveryOption(productId, deliveryOptionId);
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
