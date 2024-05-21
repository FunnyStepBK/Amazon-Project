import { cart } from "../../data/cart-class.js";

describe('test suite: addToCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });
  
  it('adds an existing product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    cart.loadStorage(); 

    cart.addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
    expect(cart.cartItems[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
      quantity: 2,
      deliveryOptionId: '1'
    }]));
    
  });

  it('adds a new product to the cart', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    cart.loadStorage();  

    cart.addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });  
});

describe('test suite: removeFromCart', () => {

  const productId1 = '3ebe75dc-64d2-4137-8860-1f5a963e534b';

  beforeEach(() => {

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);      
    });

    cart.loadStorage();

  });

  it('removes a product from the cart', () => {

    cart.removeFromCart(productId1);
    console.log(cart.cartItems);
    expect(cart.cartItems.length).toEqual(0);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',
     '[]')
    ;
    
  });

  it('remove an unexisting product (i.e. productId) from the cart (In this case the function should do nothing)', () => {

    cart.removeFromCart('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
    
  });

});

describe('test suite: cart.updateDeliveryOption', () => {

  const productId1 = '3ebe75dc-64d2-4137-8860-1f5a963e534b';

  beforeEach(() => {

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);      
    });

    cart.loadStorage();

  });

  it('Updates the delivery option of the product', () => {

    cart.updateDeliveryOption(productId1, '3');

    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',
      JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '3'
      }])
    );
    
  });

  it('updates the delivery option id of an unexisting product', () => {

    cart.updateDeliveryOption('6b07d4e7-f540-454e-8a1e-363f25dbae7d', '1');

    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart-oop',
      JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }])
    );
    
  });

  it('give the function a undefined deliveryOptionId', () => {

    cart.updateDeliveryOption(productId1, 'hello');

    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart-oop',
      JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }])
    );

    console.log(cart);

  });

}); 
