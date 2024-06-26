import { cart } from "../../data/cart-class.js";
import { fetchProducts } from "../../data/products.js";
import { renderOrderSummary } from "../../Scripts/checkout/orderSummary.js";


describe('test suite: render order Summary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'; 
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  let paymentSummaryContainer;

  beforeAll((done) => {

    fetchProducts().then(() => {
      done();
    });

  });

  beforeEach(() => {

    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container')
      .innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        <div class="js-cart-total-quantity"></div>
      `
    ;

    paymentSummaryContainer = 
      document.querySelector('.js-payment-summary')
    ;


    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    cart.loadStorage(); 
    renderOrderSummary();

  });

  afterEach(() => {

    document.querySelector('.js-test-container')
    .innerHTML = ''
    ;  

  });
  
  it('displays the cart', () => {    
    
    expect(
      document.querySelectorAll('.js-cart-item-container')
    .length).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Intermediate Size Basketball');
    
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain('$10.90');

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain('$20.95');

  });

  it('removes a product', () => {

    document.querySelector(`.js-delete-link-${productId1}`)
      .click()
    ;
    expect(
      document.querySelectorAll('.js-cart-item-container')
    .length).toEqual(1);

    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);

    expect(
      localStorage.setItem).toHaveBeenCalledWith('cart-oop', '[]'
    );
    
  });

  it('checks that cliked input is checked', () => {

    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(document.querySelector(`.js-delivery-input-${productId1}-3`).checked).toEqual(true);
    
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    
    expect(paymentSummaryContainer.innerText).toContain(
      '$14.98'
    );
    expect(paymentSummaryContainer.innerText).toContain(
      '$63.50'
    );


    
  });
  
});
