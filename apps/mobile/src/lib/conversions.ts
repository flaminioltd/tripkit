/**
 * Unit Conversion Utilities
 * Handles mathematical conversions between Metric and Imperial/US Customary systems.
 */

// --- Distance ---
export const kmToMiles = (km: number): number => km * 0.621371;
export const milesToKm = (miles: number): number => miles * 1.60934;

export const formatDistance = (value: number, system: 'metric' | 'imperial', toFixed: number = 1): string => {
  if (system === 'metric') {
    return `${value.toFixed(toFixed)} km`;
  }
  return `${kmToMiles(value).toFixed(toFixed)} mi`;
};

// --- Weight ---
export const kgToLbs = (kg: number): number => kg * 2.20462;
export const lbsToKg = (lbs: number): number => lbs / 2.20462;

export const formatWeight = (value: number, system: 'metric' | 'imperial', toFixed: number = 1): string => {
  if (system === 'metric') {
    return `${value.toFixed(toFixed)} kg`;
  }
  return `${kgToLbs(value).toFixed(toFixed)} lbs`;
};

// --- Temperature ---
export const celsiusToFahrenheit = (c: number): number => (c * 9) / 5 + 32;
export const fahrenheitToCelsius = (f: number): number => ((f - 32) * 5) / 9;

export const formatTemperature = (value: number, system: 'metric' | 'imperial', toFixed: number = 0): string => {
  if (system === 'metric') {
    return `${value.toFixed(toFixed)}°C`;
  }
  return `${celsiusToFahrenheit(value).toFixed(toFixed)}°F`;
};

// --- Volume ---
export const litersToGallons = (liters: number): number => liters * 0.264172;
export const gallonsToLiters = (gallons: number): number => gallons / 0.264172;

export const formatVolume = (value: number, system: 'metric' | 'imperial', toFixed: number = 1): string => {
  if (system === 'metric') {
    return `${value.toFixed(toFixed)} L`;
  }
  return `${litersToGallons(value).toFixed(toFixed)} gal`;
};

// --- Speed ---
export const kmhToMph = (kmh: number): number => kmh * 0.621371;
export const mphToKmh = (mph: number): number => mph * 1.60934;

export const formatSpeed = (value: number, system: 'metric' | 'imperial', toFixed: number = 0): string => {
  if (system === 'metric') {
    return `${value.toFixed(toFixed)} km/h`;
  }
  return `${kmhToMph(value).toFixed(toFixed)} mph`;
};
