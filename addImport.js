const fs = require('fs');
const path = require('path');
const d = 'c:/Users/benko/Documents Local/Online/TripKit/tripkit/apps/mobile/app/modules';
fs.readdirSync(d).filter(f=>f.endsWith('.tsx')&&f!=='_layout.tsx').forEach(f => {
  let c = fs.readFileSync(path.join(d, f), 'utf8');
  if (!c.includes('import ModuleHeader')) {
    const importStr = "import ModuleHeader from '../../src/components/app-header/ModuleHeader';\n";
    c = importStr + c;
    fs.writeFileSync(path.join(d, f), c);
    console.log('Added to', f);
  }
});
