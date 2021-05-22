import { price } from './price';
import { expectedResult1000, expectedResult2000 } from '../../mocks/expectedUsageResults';

const plans = [
  {"supplier": "eon", "plan": "variable", "rates": [{"price": 13.5, "threshold": 100}, {"price": 10}]},
  {"supplier": "ovo", "plan": "standard", "rates": [{"price": 12.5, "threshold": 300}, {"price": 11}]},
  {"supplier": "edf", "plan": "fixed", "rates": [{"price": 14.5, "threshold": 250}, {"price": 10.1, "threshold": 200}, {"price": 9}]},
  {"supplier": "bg", "plan": "standing-charge", "rates": [{"price": 9}], "standing_charge": 7}
];

describe('Command price', () => {
  it('should return the expected result for annual usage of 1000 kWh', () => {

    expect(price(1000, plans)).toEqual(expectedResult1000);
  });

  it('should return the expected result for annual usage of 2000 kWh', () => {
    
    expect(price(2000, plans)).toEqual(expectedResult2000);
  });
});
