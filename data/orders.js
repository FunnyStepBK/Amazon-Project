export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder (order) {
  orders.unshift(order);
  saveOrdersInStorage();
}

function saveOrdersInStorage () {
  localStorage.setItem('orders', JSON.stringify(orders));
}
