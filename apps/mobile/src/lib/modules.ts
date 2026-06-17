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
  id: string;
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
  { id: 'tipCalculator', title: 'Tip Calculator', category: 'Finance', CustomIcon: TipCalcIcon, fallbackIcon: 'calculate', route: '/modules/tip-calculator', backgroundColor: '#FADDE8', color: tokens.colors.text.primary },
  { id: 'vatRefund', title: 'VAT Refund', category: 'Finance', CustomIcon: VatRefundIcon, fallbackIcon: 'receipt-long', route: '/modules/vat-refund', backgroundColor: '#fbede9', color: tokens.colors.text.primary },
  { id: 'budgetTracker', title: 'Budget Tracker', category: 'Finance', CustomIcon: BudgetIcon, fallbackIcon: 'savings', route: '/modules/budget-tracker', backgroundColor: '#c9e0e5', color: tokens.colors.text.primary },
  { id: 'atmExchange', title: 'ATM & Exchange', category: 'Finance', CustomIcon: AtmExchangeIcon, fallbackIcon: 'local-atm', route: '/modules/atm-exchange', backgroundColor: '#EDE4F5', color: tokens.colors.text.primary },
];

export const ESSENTIALS_MODULES: RedesignModuleProps[] = [
  { id: 'sizeConverter', title: 'Sizes & Units', category: 'Essentials', CustomIcon: SizeGuideIcon, fallbackIcon: 'straighten', route: '/modules/size-converter', backgroundColor: '#D7F3E7', color: tokens.colors.text.primary },
  { id: 'timezoneHelper', title: 'Time Zones', category: 'Essentials', CustomIcon: TimeZoneIcon, fallbackIcon: 'schedule', route: '/modules/timezone-helper', backgroundColor: '#E4F0FF', color: tokens.colors.text.primary },
  { id: 'basicPhrases', title: 'Basic Phrases', category: 'Essentials', CustomIcon: BasicPhrasesIcon, fallbackIcon: 'translate', route: '/modules/basic-phrases', backgroundColor: '#FFE6DA', color: tokens.colors.text.primary },
  { id: 'localInfo', title: 'Local Info', category: 'Essentials', CustomIcon: LocalInfoIcon, fallbackIcon: 'info', route: '/modules/local-info', backgroundColor: '#EFE7DC', color: tokens.colors.text.primary },
];
