import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { 
  TipCalcIcon, 
  VatRefundIcon, 
  BudgetIcon, 
  AtmExchangeIcon, 
  SizeGuideIcon,
  TimeZoneIcon,
  LocalInfoIcon,
  BasicPhrasesIcon,
} from '../components/ModuleIcons';
import { tokens } from '../theme/tokens';

export type RedesignModuleProps = {
  title: string;
  category: string;
  CustomIcon?: React.ElementType<{ size?: number; color?: string }>;
  fallbackIcon: keyof typeof MaterialIcons.glyphMap;
  route: string;
  colSpan?: number;
  backgroundColor: string;
  color: string;
};

export const FINANCE_MODULES: RedesignModuleProps[] = [
  { title: 'Tip Calculator', category: 'Finance', CustomIcon: TipCalcIcon, fallbackIcon: 'calculate', route: '/modules/tip-calculator', backgroundColor: tokens.colors.brand.primary, color: tokens.colors.text.primary },
  { title: 'VAT Refund', category: 'Finance', CustomIcon: VatRefundIcon, fallbackIcon: 'receipt-long', route: '/modules/vat-refund', backgroundColor: tokens.colors.brand.tertiary, color: tokens.colors.text.primary },
  { title: 'Budget', category: 'Finance', CustomIcon: BudgetIcon, fallbackIcon: 'savings', route: '/modules/budget-tracker', backgroundColor: tokens.colors.brand.secondary, color: tokens.colors.text.primary },
  { title: 'ATM & Exchange', category: 'Finance', CustomIcon: AtmExchangeIcon, fallbackIcon: 'local-atm', route: '/modules/atm-exchange', backgroundColor: tokens.colors.surface.subtle, color: tokens.colors.text.primary },
];

export const ESSENTIALS_MODULES: RedesignModuleProps[] = [
  { title: 'Sizes & Units', category: 'Essentials', CustomIcon: SizeGuideIcon, fallbackIcon: 'straighten', route: '/modules/size-converter', backgroundColor: tokens.colors.brand.quaternary, color: tokens.colors.text.primary },
  { title: 'Time Zone', category: 'Essentials', CustomIcon: TimeZoneIcon, fallbackIcon: 'schedule', route: '/modules/timezone-helper', backgroundColor: tokens.colors.brand.quinary, color: tokens.colors.text.primary },
  { title: 'Basic Phrases', category: 'Essentials', CustomIcon: BasicPhrasesIcon, fallbackIcon: 'translate', route: '/modules/basic-phrases', backgroundColor: tokens.colors.brand.tertiary, color: tokens.colors.text.primary },
  { title: 'Local Info', category: 'Essentials', CustomIcon: LocalInfoIcon, fallbackIcon: 'info', route: '/modules/local-info', backgroundColor: tokens.colors.brand.secondary, color: tokens.colors.text.primary },
];
