export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];


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
