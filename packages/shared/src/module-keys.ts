export const MODULE_KEYS = {
  TIP_CALCULATOR: 'tip-calculator',
  VAT_REFUND: 'vat-refund',
  BUDGET_TRACKER: 'budget-tracker',
  SIZE_CONVERTER: 'size-converter',
  PLUG_VOLTAGE: 'plug-voltage',
  TIMEZONE_HELPER: 'timezone-helper',
  EMERGENCY_ESSENTIALS: 'emergency-essentials',
  ATM_EXCHANGE: 'atm-exchange',
} as const;

export type ModuleKey = typeof MODULE_KEYS[keyof typeof MODULE_KEYS];
