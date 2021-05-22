export const usage = (supplierName, planName, monthlySpend, plans) => {
  const offer = plans.find(({ supplier, plan }) => supplier === supplierName && plan === planName);

  const netAnnualSpending = getNetAnnualSpending(offer, monthlySpend);

  const isThreshold = offer.rates.some(rate => rate.threshold);
  const annualUsage = getAnnualUsage(offer.rates, netAnnualSpending, isThreshold);

  return annualUsage;

};

const getNetAnnualSpending = (offer, monthlySpend) => {
  const annualSpendingInPence = (monthlySpend * 100) * 12;
  let annualSpendingExcVAT = Math.round(annualSpendingInPence / (1 + 0.05));

  if (offer.standing_charge) {
    annualSpendingExcVAT = annualSpendingExcVAT - (offer.standing_charge * 365);
  }

  return annualSpendingExcVAT;
};

const getUsageWithThreshold = (rates, amount) => {
  const costWithinThreshold = rates
    .filter(rate => rate.threshold)
    .reduce((acc, currentValue) => {
      const priceInThreshold = currentValue.price * currentValue.threshold;
      const totalPrice = acc['totalPrice'] ? acc['totalPrice'] + priceInThreshold : priceInThreshold;
      const totalThreshold = acc['totalThreshold'] ? acc['totalThreshold'] + currentValue.threshold : currentValue.threshold;

      return {
        ...acc,
        totalPrice,
        totalThreshold
      }

    }, 0);

  const costWithoutThreshold = amount - costWithinThreshold.totalPrice;
  const baseRate = rates.filter(rate => !rate.threshold);
  const baseRateUsage = Math.round(costWithoutThreshold / baseRate[0].price);

  return baseRateUsage + costWithinThreshold.totalThreshold;
};

const getAnnualUsage = (rates, netAnnualSpending, isThreshold) => {
  if (isThreshold) {
    return getUsageWithThreshold(rates, netAnnualSpending);
  } else {
    return Math.round(netAnnualSpending / rates[0].price);
  }
};