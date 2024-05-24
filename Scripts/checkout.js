import { loadCart } from "../data/cart-class.js";
import { fetchProducts } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js"; 
// import '../data/cart-class.js'
// import '../data/car.js'
// import '../data/backend-practice.js'


Promise.all([

  fetchProducts(),


  new Promise ((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })
  
]).then((value) => {
  console.log(value);

  renderOrderSummary();
  renderPaymentSummary();

});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
  
}).then((value) => {
  console.log(value);
  
  return new Promise ((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
  
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });
*/