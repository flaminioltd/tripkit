export interface TimezoneOption {
  name: string;
  city: string;
}

export interface PlugsOption {
  voltage: string;
  frequency: string;
  types: string[];
}

export interface Country {
  name: string;
  region: string;
  code: string;
  tippingType: 'percentage' | 'round_up' | 'none';
  tippingStandard: string;
  vatRate: number;
  timezones?: TimezoneOption[];
  plugs?: PlugsOption;
}

export const COUNTRIES: Country[] = [
  { name: 'United States', region: 'North America', code: 'US', tippingType: 'percentage', tippingStandard: '15%-20%', vatRate: 0, timezones: [{ name: 'America/New_York', city: 'New York (EST)' }, { name: 'America/Chicago', city: 'Chicago (CST)' }, { name: 'America/Denver', city: 'Denver (MST)' }, { name: 'America/Los_Angeles', city: 'Los Angeles (PST)' }, { name: 'America/Anchorage', city: 'Anchorage (AKST)' }, { name: 'Pacific/Honolulu', city: 'Honolulu (HST)' }], plugs: { voltage: '120V', frequency: '60Hz', types: ['A', 'B'] } },
  { name: 'United Kingdom', region: 'Europe', code: 'GB', tippingType: 'percentage', tippingStandard: '10%-15%', vatRate: 20, timezones: [{ name: 'Europe/London', city: 'London' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['G'] } },
  { name: 'Canada', region: 'North America', code: 'CA', tippingType: 'percentage', tippingStandard: '15%-20%', vatRate: 5, timezones: [{ name: 'America/Toronto', city: 'Toronto (EST)' }, { name: 'America/Winnipeg', city: 'Winnipeg (CST)' }, { name: 'America/Edmonton', city: 'Edmonton (MST)' }, { name: 'America/Vancouver', city: 'Vancouver (PST)' }, { name: 'America/Halifax', city: 'Halifax (AST)' }, { name: 'America/St_Johns', city: 'St. John\'s (NST)' }], plugs: { voltage: '120V', frequency: '60Hz', types: ['A', 'B'] } },
  { name: 'Australia', region: 'Oceania', code: 'AU', tippingType: 'none', tippingStandard: 'Tips not expected', vatRate: 10, timezones: [{ name: 'Australia/Sydney', city: 'Sydney (AEST)' }, { name: 'Australia/Adelaide', city: 'Adelaide (ACST)' }, { name: 'Australia/Perth', city: 'Perth (AWST)' }, { name: 'Australia/Brisbane', city: 'Brisbane (AEST)' }, { name: 'Australia/Darwin', city: 'Darwin (ACST)' }, { name: 'Australia/Hobart', city: 'Hobart (AEST)' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['I'] } },
  { name: 'New Zealand', region: 'Oceania', code: 'NZ', tippingType: 'none', tippingStandard: 'Tips not expected', vatRate: 15, timezones: [{ name: 'Pacific/Auckland', city: 'Auckland' }, { name: 'Pacific/Chatham', city: 'Chatham Islands' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['I'] } },
  { name: 'Ireland', region: 'Europe', code: 'IE', tippingType: 'percentage', tippingStandard: '10%-15%', vatRate: 23, timezones: [{ name: 'Europe/Dublin', city: 'Dublin' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['G'] } },
  { name: 'France', region: 'Europe', code: 'FR', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 20, timezones: [{ name: 'Europe/Paris', city: 'Paris' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'E'] } },
  { name: 'Spain', region: 'Europe', code: 'ES', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 21, timezones: [{ name: 'Europe/Madrid', city: 'Madrid' }, { name: 'Atlantic/Canary', city: 'Canary Islands' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Italy', region: 'Europe', code: 'IT', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 22, timezones: [{ name: 'Europe/Rome', city: 'Rome' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F', 'L'] } },
  { name: 'Turkey', region: 'Europe/Asia', code: 'TR', tippingType: 'percentage', tippingStandard: '10%-15%', vatRate: 20, timezones: [{ name: 'Europe/Istanbul', city: 'Istanbul' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Germany', region: 'Europe', code: 'DE', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 19, timezones: [{ name: 'Europe/Berlin', city: 'Berlin' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Greece', region: 'Europe', code: 'GR', tippingType: 'percentage', tippingStandard: '10%-15%', vatRate: 24, timezones: [{ name: 'Europe/Athens', city: 'Athens' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Austria', region: 'Europe', code: 'AT', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 20, timezones: [{ name: 'Europe/Vienna', city: 'Vienna' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Portugal', region: 'Europe', code: 'PT', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 23, timezones: [{ name: 'Europe/Lisbon', city: 'Lisbon' }, { name: 'Atlantic/Azores', city: 'Azores' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Netherlands', region: 'Europe', code: 'NL', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 21, timezones: [{ name: 'Europe/Amsterdam', city: 'Amsterdam' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Poland', region: 'Europe', code: 'PL', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 23, timezones: [{ name: 'Europe/Warsaw', city: 'Warsaw' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'E'] } },
  { name: 'Croatia', region: 'Europe', code: 'HR', tippingType: 'percentage', tippingStandard: '10%-15%', vatRate: 25, timezones: [{ name: 'Europe/Zagreb', city: 'Zagreb' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Czech Republic', region: 'Europe', code: 'CZ', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 21, timezones: [{ name: 'Europe/Prague', city: 'Prague' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'E'] } },
  { name: 'Switzerland', region: 'Europe', code: 'CH', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 8.1, timezones: [{ name: 'Europe/Zurich', city: 'Zurich' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'J'] } },
  { name: 'Denmark', region: 'Europe', code: 'DK', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 25, timezones: [{ name: 'Europe/Copenhagen', city: 'Copenhagen' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'E', 'F', 'K'] } },
  { name: 'Hungary', region: 'Europe', code: 'HU', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 27, timezones: [{ name: 'Europe/Budapest', city: 'Budapest' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Sweden', region: 'Europe', code: 'SE', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 25, timezones: [{ name: 'Europe/Stockholm', city: 'Stockholm' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'Belgium', region: 'Europe', code: 'BE', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 21, timezones: [{ name: 'Europe/Brussels', city: 'Brussels' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'E'] } },
  { name: 'Norway', region: 'Europe', code: 'NO', tippingType: 'round_up', tippingStandard: 'Round up', vatRate: 25, timezones: [{ name: 'Europe/Oslo', city: 'Oslo' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'F'] } },
  { name: 'China', region: 'Asia', code: 'CN', tippingType: 'none', tippingStandard: 'Tips not expected', vatRate: 13, timezones: [{ name: 'Asia/Shanghai', city: 'Beijing' }], plugs: { voltage: '220V', frequency: '50Hz', types: ['A', 'C', 'I'] } },
  { name: 'Japan', region: 'Asia', code: 'JP', tippingType: 'none', tippingStandard: 'Tips not expected', vatRate: 10, timezones: [{ name: 'Asia/Tokyo', city: 'Tokyo' }], plugs: { voltage: '100V', frequency: '50/60Hz', types: ['A', 'B'] } },
  { name: 'Thailand', region: 'Asia', code: 'TH', tippingType: 'percentage', tippingStandard: '10%-15%', vatRate: 7, timezones: [{ name: 'Asia/Bangkok', city: 'Bangkok' }], plugs: { voltage: '220V', frequency: '50Hz', types: ['A', 'B', 'C', 'O'] } },
  { name: 'Vietnam', region: 'Asia', code: 'VN', tippingType: 'percentage', tippingStandard: '10%-15%', vatRate: 10, timezones: [{ name: 'Asia/Ho_Chi_Minh', city: 'Ho Chi Minh City' }], plugs: { voltage: '220V', frequency: '50Hz', types: ['A', 'C', 'F'] } },
  { name: 'South Korea', region: 'Asia', code: 'KR', tippingType: 'none', tippingStandard: 'Tips not expected', vatRate: 10, timezones: [{ name: 'Asia/Seoul', city: 'Seoul' }], plugs: { voltage: '220V', frequency: '60Hz', types: ['C', 'F'] } },
  { name: 'India', region: 'Asia', code: 'IN', tippingType: 'percentage', tippingStandard: '10%-15%', vatRate: 18, timezones: [{ name: 'Asia/Kolkata', city: 'New Delhi' }], plugs: { voltage: '230V', frequency: '50Hz', types: ['C', 'D', 'M'] } },
  { name: 'Mexico', region: 'Latin America', code: 'MX', tippingType: 'percentage', tippingStandard: '10%-15%', vatRate: 16, timezones: [{ name: 'America/Mexico_City', city: 'Mexico City (CST)' }, { name: 'America/Cancun', city: 'Cancun (EST)' }, { name: 'America/Mazatlan', city: 'Mazatlan (MST)' }, { name: 'America/Tijuana', city: 'Tijuana (PST)' }], plugs: { voltage: '127V', frequency: '60Hz', types: ['A', 'B'] } },
  { name: 'Brazil', region: 'Latin America', code: 'BR', tippingType: 'percentage', tippingStandard: '10%', vatRate: 17, timezones: [{ name: 'America/Sao_Paulo', city: 'Sao Paulo' }, { name: 'America/Manaus', city: 'Manaus' }, { name: 'America/Rio_Branco', city: 'Rio Branco' }], plugs: { voltage: '127V / 220V', frequency: '60Hz', types: ['N', 'C'] } },
  { name: 'Argentina', region: 'Latin America', code: 'AR', tippingType: 'percentage', tippingStandard: '10%', vatRate: 21, timezones: [{ name: 'America/Argentina/Buenos_Aires', city: 'Buenos Aires' }], plugs: { voltage: '220V', frequency: '50Hz', types: ['C', 'I'] } },
];
