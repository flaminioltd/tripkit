export interface VatCalculationInput {
  purchaseAmount: number;
  vatRate: number;
  adminFeePercentage?: number;
}

export interface VatCalculationResult {
  estimatedRefund: number;
  effectiveRefundRate: number;
}

export function calculateVatRefund(input: VatCalculationInput): VatCalculationResult {
  const { purchaseAmount, vatRate, adminFeePercentage = 0 } = input;
  
  // The purchase amount includes VAT.
  // VAT amount = purchaseAmount - (purchaseAmount / (1 + vatRate / 100))
  const vatAmount = purchaseAmount - (purchaseAmount / (1 + vatRate / 100));
  const feeAmount = vatAmount * (adminFeePercentage / 100);
  const estimatedRefund = vatAmount - feeAmount;
  const effectiveRefundRate = purchaseAmount > 0 ? (estimatedRefund / purchaseAmount) * 100 : 0;

  return {
    estimatedRefund,
    effectiveRefundRate,
  };
}
