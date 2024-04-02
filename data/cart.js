export const cart = [];


// CART MANAGER
export function addToCart (productId, productName) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productName === cartItem.productName) {
      matchingItem = cartItem;
    }
  })

  const cartItemQuantity = document.querySelector(`.js-cartItem-quantity-${productId}`);

  const quantity = Number(cartItemQuantity.value)

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productName,
      quantity
    });
  };
}
