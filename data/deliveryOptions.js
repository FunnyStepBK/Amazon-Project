import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function getDeliveryOption (deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  }); 
  return deliveryOption;
}

export function calculateDeliveryDate (deliveryOption) {
  const today = dayjs();
  let deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );

  const deliveryDay = deliveryDate.format('dddd');

  if (deliveryDay === 'Saturday') {
    deliveryDate = today.add(
      deliveryOption.deliveryDays + 2,
      'days'
    );

    return deliveryDate.format(
      'dddd, MMMM D'
    );
  } else if (deliveryDay === 'Sunday') {
    deliveryDate = today.add(
      deliveryOption.deliveryDays + 1,
      'days'
    );

    return deliveryDate.format(
      'dddd, MMMM D'
    );
  } else {
    return deliveryDate.format(
      'dddd, MMMM D'
    );
  }
}