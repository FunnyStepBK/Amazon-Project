import { formatCurrency } from "../Scripts/utils/money.js";

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed');
  console.log(formatCurrency(2000.4))
}