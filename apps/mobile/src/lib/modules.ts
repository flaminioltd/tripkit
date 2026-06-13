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
  { title: 'Tip Calculator', category: 'Finance', CustomIcon: TipCalcIcon, fallbackIcon: 'calculate', route: '/modules/tip-calculator', backgroundColor: '#FADDE8', color: tokens.colors.text.primary },
  { title: 'VAT Refund', category: 'Finance', CustomIcon: VatRefundIcon, fallbackIcon: 'receipt-long', route: '/modules/vat-refund', backgroundColor: '#FFF3B8', color: tokens.colors.text.primary },
  { title: 'Budget Tracker', category: 'Finance', CustomIcon: BudgetIcon, fallbackIcon: 'savings', route: '/modules/budget-tracker', backgroundColor: '#E2F7DE', color: tokens.colors.text.primary },
  { title: 'ATM & Exchange', category: 'Finance', CustomIcon: AtmExchangeIcon, fallbackIcon: 'local-atm', route: '/modules/atm-exchange', backgroundColor: '#EDE4F5', color: tokens.colors.text.primary },
];

export const ESSENTIALS_MODULES: RedesignModuleProps[] = [
  { title: 'Sizes & Units', category: 'Essentials', CustomIcon: SizeGuideIcon, fallbackIcon: 'straighten', route: '/modules/size-converter', backgroundColor: '#F2E2B8', color: tokens.colors.text.primary },
  { title: 'Time Zones', category: 'Essentials', CustomIcon: TimeZoneIcon, fallbackIcon: 'schedule', route: '/modules/timezone-helper', backgroundColor: '#E4F0FF', color: tokens.colors.text.primary },
  { title: 'Basic Phrases', category: 'Essentials', CustomIcon: BasicPhrasesIcon, fallbackIcon: 'translate', route: '/modules/basic-phrases', backgroundColor: '#FFE6DA', color: tokens.colors.text.primary },
  { title: 'Local Info', category: 'Essentials', CustomIcon: LocalInfoIcon, fallbackIcon: 'info', route: '/modules/local-info', backgroundColor: '#F2F2F0', color: tokens.colors.text.primary },
];
