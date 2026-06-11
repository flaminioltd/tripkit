export interface ExchangeComparisonInput {
  baseAmount: number;
  baseCurrencyType: 'home' | 'local';
  midMarketRate: number; // 1 Home = X Local
  
  // ATM Inputs
  atmLocalFeeLocal: number; // Flat fee charged by ATM in local currency
  atmHomeBankFxFeePercentage: number; // Percentage fee charged by home bank
  atmHomeBankFlatFeeHome: number; // Flat fee charged by home bank in home currency
  
  // Exchange Bureau Inputs
  exchangeBureauRate: number; // 1 Home = X Local offered by the bureau
  exchangeBureauFee: number; // Flat commission fee
  exchangeBureauFeeCurrency: 'home' | 'local' | 'percentage'; // Which currency the fee is in, or percentage
}

export interface ExchangeComparisonResult {
  atmHomeCost: number;
  atmLocalReceived: number;
  atmEffectiveRate: number; // Local per 1 Home
  
  bureauHomeCost: number;
  bureauLocalReceived: number;
  bureauEffectiveRate: number; // Local per 1 Home
  
  recommendation: 'ATM' | 'Exchange Bureau' | 'Equal';
  differenceHome: number; // How much home currency saved by taking the recommendation
  differenceLocal: number; // How much local currency gained by taking the recommendation
}

export function compareAtmAndExchange(input: ExchangeComparisonInput): ExchangeComparisonResult {
  const { 
    baseAmount, baseCurrencyType, midMarketRate,
    atmLocalFeeLocal, atmHomeBankFxFeePercentage, atmHomeBankFlatFeeHome,
    exchangeBureauRate, exchangeBureauFee, exchangeBureauFeeCurrency
  } = input;

  let atmHomeCost = 0;
  let atmLocalReceived = 0;
  let bureauHomeCost = 0;
  let bureauLocalReceived = 0;

  const safeMidRate = midMarketRate || 1;
  const safeBureauRate = exchangeBureauRate || 1;

  if (baseCurrencyType === 'local') {
    // User wants exact `baseAmount` in LOCAL currency.
    // ATM
    atmLocalReceived = baseAmount;
    atmHomeCost = ((baseAmount + atmLocalFeeLocal) / safeMidRate) * (1 + atmHomeBankFxFeePercentage / 100) + atmHomeBankFlatFeeHome;
    
    // Bureau
    bureauLocalReceived = baseAmount;
    let requiredLocalBeforeFee = baseAmount;
    if (exchangeBureauFeeCurrency === 'local') {
      requiredLocalBeforeFee = baseAmount + exchangeBureauFee;
      bureauHomeCost = requiredLocalBeforeFee / safeBureauRate;
    } else if (exchangeBureauFeeCurrency === 'home') {
      // Fee is in home currency
      bureauHomeCost = (baseAmount / safeBureauRate) + exchangeBureauFee;
    } else {
      // Fee is percentage
      const effectivePercentage = Math.min(exchangeBureauFee, 99.99); // Prevent division by zero or negative
      bureauHomeCost = baseAmount / (safeBureauRate * (1 - effectivePercentage / 100));
    }
  } else {
    // User has exact `baseAmount` in HOME currency to spend.
    // ATM
    atmHomeCost = baseAmount;
    const effectiveHomeForFx = baseAmount - atmHomeBankFlatFeeHome;
    if (effectiveHomeForFx <= 0) {
      atmLocalReceived = 0;
    } else {
      atmLocalReceived = (effectiveHomeForFx / (1 + atmHomeBankFxFeePercentage / 100)) * safeMidRate - atmLocalFeeLocal;
      if (atmLocalReceived < 0) atmLocalReceived = 0;
    }

    // Bureau
    bureauHomeCost = baseAmount;
    if (exchangeBureauFeeCurrency === 'local') {
      bureauLocalReceived = (baseAmount * safeBureauRate) - exchangeBureauFee;
    } else if (exchangeBureauFeeCurrency === 'home') {
      const effectiveHome = baseAmount - exchangeBureauFee;
      bureauLocalReceived = effectiveHome > 0 ? effectiveHome * safeBureauRate : 0;
    } else {
      // Fee is percentage
      const effectivePercentage = Math.min(exchangeBureauFee, 100);
      bureauLocalReceived = baseAmount * safeBureauRate * (1 - effectivePercentage / 100);
    }
    if (bureauLocalReceived < 0) bureauLocalReceived = 0;
  }

  const atmEffectiveRate = atmHomeCost > 0 ? atmLocalReceived / atmHomeCost : 0;
  const bureauEffectiveRate = bureauHomeCost > 0 ? bureauLocalReceived / bureauHomeCost : 0;

  let recommendation: 'ATM' | 'Exchange Bureau' | 'Equal' = 'Equal';
  let differenceHome = 0;
  let differenceLocal = 0;

  if (baseCurrencyType === 'local') {
    // We want the same local amount, so we compare home costs (lower is better)
    if (atmHomeCost < bureauHomeCost) {
      recommendation = 'ATM';
      differenceHome = bureauHomeCost - atmHomeCost;
      differenceLocal = differenceHome * safeMidRate;
    } else if (bureauHomeCost < atmHomeCost) {
      recommendation = 'Exchange Bureau';
      differenceHome = atmHomeCost - bureauHomeCost;
      differenceLocal = differenceHome * safeMidRate;
    }
  } else {
    // We spend the same home amount, so we compare local received (higher is better)
    if (atmLocalReceived > bureauLocalReceived) {
      recommendation = 'ATM';
      differenceLocal = atmLocalReceived - bureauLocalReceived;
      differenceHome = differenceLocal / safeMidRate;
    } else if (bureauLocalReceived > atmLocalReceived) {
      recommendation = 'Exchange Bureau';
      differenceLocal = bureauLocalReceived - atmLocalReceived;
      differenceHome = differenceLocal / safeMidRate;
    }
  }

  return {
    atmHomeCost,
    atmLocalReceived,
    atmEffectiveRate,
    bureauHomeCost,
    bureauLocalReceived,
    bureauEffectiveRate,
    recommendation,
    differenceHome,
    differenceLocal
  };
}
