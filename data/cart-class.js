import { renderOrderSummary } from "../Scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../Scripts/checkout/paymentSummary.js";


class Cart {

  // * THE VARIABLE THAT STORES THE WHOLE CART

  cartItems;


  // * THE VARIABLE THAT HOLDS THE LOCALSTORGE NAME

  #localStorageKey;


  // * RUNS THE SETUP CODE FOR THE CLASS

  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadStorage();
  }


  // done LOADS THE CART FROM THE LOCALSTORAGE

  #loadStorage () {

    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) { 
      this.cartItems =
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
  };

  
  // * ADDS PRODUCTS TO THE CART

  addToCart (productId) {
    this.#loadStorage();
    let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
  
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
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    };
  
    this.saveToStorage();
  };


  // * REMOVES A PRODUCT FROM THE CART

  removeFromCart (productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
  
      this.cartItems = newCart;

      this.saveToStorage();

    })
  };
  
  
  // * UPDATES THE QUANTITY OF THE PRODUCT WHOSE QUANTITY HAS BEEN CHANGED ON THE PAGE

  updateQuantity (productId, newQuantity) {
    
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        if (newQuantity) {
          if (newQuantity > 0 && newQuantity < 20 && Number.isInteger(Number(newQuantity))) {
            cartItem.quantity = Number(newQuantity);
            renderOrderSummary();
            renderPaymentSummary();
          } else {
            alert('Invalid Quantity');
            return;
          }
        }
      }
    });

    this.saveToStorage();

  };


  // * UPDATES THE DELIVERY OPTION OF A PRODUCT BASED ON THE DESIRED OPTION

  updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {  
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (!matchingItem) {
      return;
    }
  
    if (deliveryOptionId === '1' || deliveryOptionId === '2' ||
    deliveryOptionId === '3') {
      
      matchingItem.deliveryOptionId = deliveryOptionId;
  
      this.saveToStorage();
      
    } else {
      return;
    }
  
  };


  // done UPDATES THE TOTAL CART QUANTITY WHENEVER A NEW OR EXISTING PRODUCT IS ADDED TO THE CART

  updateCartQunatity () {
    let totalQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });
    return totalQuantity;
  };


  // * UPDATES THE LOCALSTORAGE 

  saveToStorage () {

    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));

  };

};


export const cart = new Cart('cart-oop');
export const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);
