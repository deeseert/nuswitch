export const price = (energyUsage, marketOffers) => {

  return marketOffers
    .map((offer) => generateOffer(offer, energyUsage))
    .sort((a, b) => a.totalCost - b.totalCost);

};

const generateOffer = (offer, energyUsage) => {
  const { rates, standing_charge } = offer;
  let totalMarketCost = getTotalMarketCost(rates, energyUsage);

  if (standing_charge) {
    totalMarketCost = totalMarketCost + (365 * standing_charge)
  }

  return {
    supplier: offer.supplier,
    plan: offer.plan,
    totalCost: addVAT(totalMarketCost)
  };
};

const getTotalMarketCost = (rates, energyUsage) => {
  let annualUsage = energyUsage;

  return rates.reduce((accumulator, currentValue) => {
    const { threshold, price } = currentValue;

    if (threshold) {
      const usageBeforeThreshold = (threshold > annualUsage) ? annualUsage : threshold;
      annualUsage = (annualUsage - usageBeforeThreshold);
      return accumulator + (usageBeforeThreshold * price);
    } else {
      return accumulator + (annualUsage * price);
    }

  }, 0);

}

const addVAT = (totalCost) => {
  const vatToBeAdded = totalCost * 0.05;
  const rateFromCentsToPounds = (totalCost + vatToBeAdded) / 100;
  const rateRounded = Math.round(rateFromCentsToPounds * 100) / 100;

  return rateRounded;
}
