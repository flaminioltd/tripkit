const fs = require('fs');
const path = require('path');

const countryListPath = path.join(__dirname, '../../../country_list.json');
const countriesTsPath = path.join(__dirname, 'src/lib/countries.ts');
const assetsTsPath = path.join(__dirname, 'src/lib/assets.ts');

const countriesData = JSON.parse(fs.readFileSync(countryListPath, 'utf8'));

// 1. Generate countries.ts
const countriesTsContent = `export interface Country {
  name: string;
  region: string;
  code: string;
}

export const COUNTRIES: Country[] = [
${countriesData.map(c => `  { name: '${c.name.replace(/'/g, "\\'")}', region: '${c.region}', code: '${c.code}' },`).join('\n')}
];
`;
fs.writeFileSync(countriesTsPath, countriesTsContent);

// 2. Generate assets.ts
const flagMap = countriesData.map(c => `  ${c.code}: require('../../assets/images/flags/${c.code.toLowerCase()}.png'),`).join('\n');
const coverMap = countriesData.map(c => `  ${c.code}: require('../../assets/images/covers/${c.code.toLowerCase()}_cover.jpg'),`).join('\n');

const assetsTsContent = `export const FLAG_IMAGES: Record<string, any> = {
${flagMap}
};

export const COVER_IMAGES: Record<string, any> = {
${coverMap}
};
`;
fs.writeFileSync(assetsTsPath, assetsTsContent);

console.log('Successfully generated countries.ts and assets.ts');
