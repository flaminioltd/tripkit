const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/benko/Documents Local/Online/TripKit/tripkit/apps/mobile/app/modules';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== '_layout.tsx');

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Find title
  const titleMatch = content.match(/<Text variant="titleLarge"[^>]*>([^<]+)<\/Text>/);
  if (!titleMatch) {
    console.log(`No title found in ${file}`);
    continue;
  }
  const title = titleMatch[1];
  
  const exactPattern = /<View style=\{\[styles\.header[\s\S]*?<IconButton[\s\S]*?<Text variant="titleLarge"[\s\S]*?<View style=\{\{ width: 48[\s\S]*?<\/View>\s*<\/View>/;
  
  const replaced = content.replace(exactPattern, `<ModuleHeader title="${title}" />`);
  if (replaced === content) {
    console.log(`Pattern not matched in ${file}`);
    continue;
  }
  
  // add import if not exists
  let newContent = replaced;
  if (!newContent.includes('ModuleHeader')) {
    const lastImportIndex = newContent.lastIndexOf('import ');
    const endOfLastImport = newContent.indexOf('\n', lastImportIndex);
    newContent = newContent.slice(0, endOfLastImport) + "\nimport ModuleHeader from '../../src/components/app-header/ModuleHeader';" + newContent.slice(endOfLastImport);
  }
  
  fs.writeFileSync(path.join(dir, file), newContent);
  console.log(`Updated ${file}`);
}
