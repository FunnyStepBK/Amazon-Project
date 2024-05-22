import { products, loadProducts } from '../data/products.js';
import { cart } from '../data/cart-class.js';

loadProducts(renderProductsGrid);

function renderProductsGrid () {

  let productsHTML = '';

  const cartQuantity = cart.updateCartQunatity();
  
  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>
  
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
  
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
  
        <div class="product-price">
          ${product.getPrice()}
        </div>
  
        <div class="product-quantity-container">
          <select class="js-cartItem-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
  
        ${product.extraInfoHTML()}
  
        <div class="product-spacer"></div>
  
        <div class="added-to-cart js-added-message-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>
  
        <button class="add-to-cart-button button-primary js-cart-btn" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`
    ;
  });
  
  document.querySelector('.js-products-grid')
  .innerHTML = productsHTML
  ;
  
  document.querySelector('.js-cart-quantity').innerText = cartQuantity;
  
  
  // TEXT MESSAGE ADDED POP-UP
  
  let addedMessageTimeouts = {};
  
  
    function addedMesagePopup (productId) {
    const addedMessage = document.querySelector(`.js-added-message-${productId}`);
  
    addedMessage.classList.add('added-to-cart-active');      
  
    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }
  
    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-active');
    }, 2000);
  
    addedMessageTimeouts[productId]= timeoutId;
  }
  
  
  document.querySelectorAll('.js-cart-btn')
    .forEach((button) => {
      button.addEventListener('click', () => {
        
        const productId = button.dataset.productId;
  
        // CART MANAGER
        cart.addToCart(productId, cartQuantity);
            
        // CART QUANTITY DISPLAY 
        calculateCartQunatity();
  
        // ADDED MESSAGE TEXT REVEAL
        addedMesagePopup(productId);
  
  
      });
    });
  ;
  
  function calculateCartQunatity () {
    const cartQuantity = cart.updateCartQunatity();
  
    document.querySelector('.js-cart-quantity')
      .innerText = cartQuantity;
    ;
  }  
}

