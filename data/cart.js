export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId: '1'
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionId: '2'
}];


// CART MANAGER
export function addToCart (productId, cartQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })

  const cartItemQuantity = document.querySelector(`.js-cartItem-quantity-${productId}`);

  const quantity = Number(cartItemQuantity.value)

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  };

  localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart (productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }

    cart = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));
  })
}

export function updateQuantity (productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      if (newQuantity) {
        if (newQuantity > 0 && newQuantity < 100) {
          cartItem.quantity = Number(newQuantity);
          document.querySelector(`.quantity-label-${productId}`)
            .innerText = cartItem.quantity;
          ;  
        } else {
          alert('Invalid Quantity');
        }
      }
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart));
}
