const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.expo') {
        walkDir(dirPath, callback);
      }
    } else {
      if (f.endsWith('.tsx') || f.endsWith('.ts')) {
        callback(path.join(dir, f));
      }
    }
  });
}

const root = 'c:/Users/benko/Documents Local/Online/TripKit/tripkit/apps/mobile';

walkDir(root, (f) => {
  const normalizedFile = f.replace(/\\/g, '/');
  if (normalizedFile.endsWith('src/components/ui/Button.tsx')) return;
  
  let content = fs.readFileSync(f, 'utf8');
  
  if (content.includes("from 'react-native-paper'")) {
    const hasButton = /import\s+\{[^}]*\bButton\b[^}]*\}\s+from\s+['"]react-native-paper['"]/.test(content);
    if (hasButton) {
      // Find the specific import statement block
      content = content.replace(/import\s+\{([^}]*)\}\s+from\s+['"]react-native-paper['"];?/, (match, imports) => {
        // imports is what is inside the {}
        let newImports = imports.split(',').map(s => s.trim()).filter(s => s !== '' && s !== 'Button');
        if (newImports.length > 0) {
          return `import { ${newImports.join(', ')} } from 'react-native-paper';`;
        } else {
          return ''; // no imports left
        }
      });
      
      // 2. Add our Button import
      const dir = path.dirname(f);
      const targetDir = path.resolve('c:/Users/benko/Documents Local/Online/TripKit/tripkit/apps/mobile/src/components/ui');
      let relPath = path.relative(dir, path.join(targetDir, 'Button'));
      relPath = relPath.replace(/\\/g, '/');
      if (!relPath.startsWith('.')) relPath = './' + relPath;

      const newImport = `import Button from '${relPath}';\n`;
      content = newImport + content;
      
      fs.writeFileSync(f, content, 'utf8');
      console.log('Updated ' + f);
    }
  }
});
