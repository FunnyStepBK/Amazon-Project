
let productsHTML = '';

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
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-item-quantity-${product.id}">
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

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-message-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-cart-btn" data-product-id= "${product.id}">
        Add to Cart
      </button>
    </div>`
  ;
});

document.querySelector('.js-products-grid')
 .innerHTML = productsHTML
;

let addedMessageTimeouts = {};

document.querySelectorAll('.js-cart-btn')
  .forEach((button) => {
    button.addEventListener('click', () => {
      
      const {productId, productName} = button.dataset;

      // CART MANAGER
      let matchingItem;

      cart.forEach((item) => {
        if (productName === item.productName) {
          matchingItem = item;
        }
      })

      const itemQuantity = document.querySelector(`.js-item-quantity-${productId}`);

      const quantity = Number(itemQuantity.value)

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productName,
          quantity
        });
      };

      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity').innerText = cartQuantity;

      
      // ADDED MESSAGE TEXT REVEAL
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

    });
  });
;