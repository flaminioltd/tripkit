import { Region } from '../services/sizeGuideService';
import { COUNTRIES } from './countries';

export type MeasurementSystem = 'metric' | 'imperial';

export interface CountryUnits {
  distance: MeasurementSystem;
  temperature: MeasurementSystem;
  weight: MeasurementSystem;
  volume: MeasurementSystem;
  speed: MeasurementSystem;
}

/**
 * Returns the granular measurement systems for a given country code.
 */
export const getMeasurementSystem = (countryCode: string): CountryUnits => {
  const units: CountryUnits = {
    distance: 'metric',
    temperature: 'metric',
    weight: 'metric',
    volume: 'metric',
    speed: 'metric',
  };

  if (countryCode === 'US') {
    units.distance = 'imperial';
    units.temperature = 'imperial';
    units.weight = 'imperial';
    units.volume = 'imperial';
    units.speed = 'imperial';
  } else if (countryCode === 'GB') {
    // UK mixes metric and imperial. Distance and speed are imperial (miles, mph).
    units.distance = 'imperial';
    units.speed = 'imperial';
  }

  return units;
};

/**
 * Helper to determine if a region typically uses letter sizes for general clothing.
 */
export const usesLetterSizes = (region: Region): boolean => {
  return region === 'US' || region === 'UK' || region === 'AU';
};

/**
 * Maps a country code to a clothing/shoe size region format.
 */
export const getSizeRegion = (countryCode: string): Region => {
  switch (countryCode) {
    case 'US':
    case 'CA':
    case 'MX':
      return 'US';
    case 'GB':
    case 'IE':
    case 'AU':
    case 'NZ':
    case 'IN':
      return 'UK';
    case 'JP':
    case 'KR':
    case 'CN':
      return 'JP';
    case 'IT':
      return 'IT';
    case 'FR':
      return 'FR';
    default:
      // Most of Europe and LatAm standardizes loosely on EU sizes for shoes/clothes
      return 'EU';
  }
};

/**
 * Helper to get country code from country name, since activeTrip stores the name.
 */
export const getCountryCodeByName = (name: string): string | null => {
  const country = COUNTRIES.find(c => c.name === name);
  return country ? country.code : null;
};
