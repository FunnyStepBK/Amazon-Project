import {cart, removeFromCart, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate);

let cartSummaryHTML = '';

let cartQuantity = 0;


cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  cartQuantity += cartItem.quantity;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML +=
  `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

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
        let totalQuantity = 0;
        cart.forEach((cartItem) => {
            totalQuantity += cartItem.quantity;
        });
        cartQuantity = totalQuantity;
        document.querySelector
        ('.js-cart-total-quantity')
          .innerText = `${cartQuantity} Items`
        ;
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
        document.querySelector
        ('.js-cart-total-quantity')
          .innerText = `${cartQuantity} Items`
        ;
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
