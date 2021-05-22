import { usage } from './usage';

const plans = [
  {"supplier": "eon", "plan": "variable", "rates": [{"price": 13.5, "threshold": 100}, {"price": 10}]},
  {"supplier": "ovo", "plan": "standard", "rates": [{"price": 12.5, "threshold": 300}, {"price": 11}]},
  {"supplier": "edf", "plan": "fixed", "rates": [{"price": 14.5, "threshold": 250}, {"price": 10.1, "threshold": 200}, {"price": 9}]},
  {"supplier": "bg", "plan": "standing-charge", "rates": [{"price": 9}], "standing_charge": 7}
];

describe('Command "Usage"', () => {
  describe('should return the annual energy consumption (in Kwh) for a specific supplier based on a monthly spend in pounds', () => {
    it('should return 4427 for edf fixed', () => {
      const expectedResult = 44267;
      const supplierName = 'edf';
      const planName = 'fixed';
      const monthlySpend = 350;
  
      expect(usage(supplierName, planName, monthlySpend, plans)).toEqual(expectedResult);
    });

    it('should return 103855 for edf fixed', () => {
      const expectedResult = 103855;
      const supplierName = 'ovo';
      const planName = 'standard';
      const monthlySpend = 1000;
  
      expect(usage(supplierName, planName, monthlySpend, plans)).toEqual(expectedResult);
    });

    it('should return 14954 for edf fixed', () => {
      const expectedResult = 14954;
      const supplierName = 'bg';
      const planName = 'standing-charge';
      const monthlySpend = 120;
  
      expect(usage(supplierName, planName, monthlySpend, plans)).toEqual(expectedResult);
    });
  });
});