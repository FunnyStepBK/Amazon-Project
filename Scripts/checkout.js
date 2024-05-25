import { fetchProducts } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js"; 
// import '../data/cart-class.js'
// import '../data/car.js'
// import '../data/backend-practice.js'


async function loadPage () {

  try {
    await fetchProducts();
    
  } catch (error) {
    console.error('Unexpected Error. Please try again later.', error);
  }
  
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
