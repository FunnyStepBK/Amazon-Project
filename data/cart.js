import { renderOrderSummary } from "../Scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../Scripts/checkout/paymentSummary.js";

export let cart;

loadStorage();

export function loadStorage () {

  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) { 
    cart =
    [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}


// CART MANAGER
export function addToCart (productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })
 
  const cartItemQuantity = document.querySelector(`.js-cartItem-quantity-${productId}`);
  
  let quantity;

  if (cartItemQuantity) {
    quantity = Number(cartItemQuantity.value);
  } else {
    quantity = 1;
  }
  

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  };

  const cartQuantity = updateCartQunatity();

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
           renderOrderSummary();
           renderPaymentSummary();
        } else {
          alert('Invalid Quantity');
        }
      }
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart));
} 

export function updateDeliveryOption (productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQunatity () {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return totalQuantity;
}