import { loadCart } from "../data/cart-class.js";
import { fetchProducts } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js"; 
// import '../data/cart-class.js'
// import '../data/car.js'
// import '../data/backend-practice.js'


async function loadPage () {
  await fetchProducts();

  renderOrderSummary();
  renderPaymentSummary();
  
}

async function fetchData() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const data = await response.text();
  return data;
}

async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getData(); 
loadPage();
