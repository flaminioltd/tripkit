export interface TipCalculationInput {
  billAmount: number;
  tipPercentage: number;
  splitCount: number;
}

export interface TipCalculationResult {
  tipAmount: number;
  totalAmount: number;
  perPersonAmount: number;
}

export function calculateTip(input: TipCalculationInput): TipCalculationResult {
  const { billAmount, tipPercentage, splitCount } = input;
  
  const tipAmount = billAmount * (tipPercentage / 100);
  const totalAmount = billAmount + tipAmount;
  const perPersonAmount = splitCount > 0 ? totalAmount / splitCount : totalAmount;

  return {
    tipAmount,
    totalAmount,
    perPersonAmount,
  };
}
