const fs = require('fs');
const path = require('path');

const iconsDir = 'c:/Users/benko/Documents Local/Online/TripKit/Icons';
const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));

const components = {
  'tip-calculator.svg': 'TipCalcIcon',
  'vat-refund.svg': 'VatRefundIcon',
  'budget-tracker.svg': 'BudgetIcon',
  'atm-exchange.svg': 'AtmExchangeIcon',
  'size-guide.svg': 'SizeGuideIcon',
  'time-zone.svg': 'TimeZoneIcon',
  'plugs.svg': 'PlugsIcon',
  'local-info.svg': 'LocalInfoIcon',
  'basic-phrases.svg': 'BasicPhrasesIcon',
};

let output = `import React from 'react';\nimport Svg, { Path, G, Line, Circle, Rect, Defs, ClipPath } from 'react-native-svg';\n\ntype IconProps = {\n  size?: number;\n  color?: string;\n};\n\n`;

for (const file of files) {
  if (!components[file]) continue;
  
  const compName = components[file];
  let svgContent = fs.readFileSync(path.join(iconsDir, file), 'utf8');
  
  // Clean up any xml prolog or DOCTYPE
  svgContent = svgContent.replace(/<\?xml.*?\?>/, '').replace(/<!DOCTYPE.*?>/, '');

  // Extract the viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  const svgStart = svgContent.indexOf('<svg');
  const svgOpenEnd = svgContent.indexOf('>', svgStart);
  let inner = svgContent.substring(svgOpenEnd + 1, svgContent.lastIndexOf('</svg>'));
  
  // Remove desc and title tags completely
  inner = inner.replace(/<desc>[\s\S]*?<\/desc>/g, '')
               .replace(/<title>[\s\S]*?<\/title>/g, '');
  
  inner = inner.replace(/<g/g, '<G')
               .replace(/<\/g>/g, '</G>')
               .replace(/<path/g, '<Path')
               .replace(/<\/path>/g, '</Path>')
               .replace(/<circle/g, '<Circle')
               .replace(/<\/circle>/g, '</Circle>')
               .replace(/<rect/g, '<Rect')
               .replace(/<\/rect>/g, '</Rect>')
               .replace(/<line/g, '<Line')
               .replace(/<\/line>/g, '</Line>')
               .replace(/<polyline/g, '<Polyline')
               .replace(/<\/polyline>/g, '</Polyline>')
               .replace(/<polygon/g, '<Polygon')
               .replace(/<\/polygon>/g, '</Polygon>')
               .replace(/<defs/g, '<Defs')
               .replace(/<\/defs>/g, '</Defs>')
               .replace(/<clipPath/g, '<ClipPath')
               .replace(/<\/clipPath>/g, '</ClipPath>');

  const camelAttributes = [
    'fill-rule', 'clip-rule', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'clip-path'
  ];
  for (const attr of camelAttributes) {
    const camel = attr.replace(/-([a-z])/g, g => g[1].toUpperCase());
    const re = new RegExp(attr + '=', 'g');
    inner = inner.replace(re, camel + '=');
  }

  // Replace class attributes (not well supported in RN, converting to className or just removing them)
  inner = inner.replace(/class="/g, 'className="');

  // Find fill="..." and stroke="..." and replace with color if it's not "none"
  inner = inner.replace(/fill="([^"]+)"/g, (match, p1) => {
    if (p1 === 'none' || p1.toLowerCase() === 'transparent') return 'fill="none"';
    return `fill={color}`;
  });
  
  inner = inner.replace(/stroke="([^"]+)"/g, (match, p1) => {
    if (p1 === 'none' || p1.toLowerCase() === 'transparent') return 'stroke="none"';
    return `stroke={color}`;
  });

  output += `export const ${compName} = ({ size = 24, color = '#000000' }: IconProps) => (\n`;
  output += `  <Svg viewBox="${viewBox}" width={size} height={size}>\n`;
  output += `    ${inner}\n`;
  output += `  </Svg>\n`;
  output += `);\n\n`;
}

fs.writeFileSync('c:/Users/benko/Documents Local/Online/TripKit/tripkit/apps/mobile/src/components/ModuleIcons.tsx', output);
console.log('Successfully generated ModuleIcons.tsx with 9 SVGs');
