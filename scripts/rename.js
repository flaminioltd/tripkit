const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// Directories to ignore
const ignoreDirs = ['node_modules', '.git', 'android', 'ios', 'dist', 'build', '.expo'];

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignoreDirs.includes(file)) {
        walkAndReplace(fullPath);
      }
    } else {
      // only check text-like files
      if (
        fullPath.endsWith('.json') ||
        fullPath.endsWith('.tsx') ||
        fullPath.endsWith('.ts') ||
        fullPath.endsWith('.js') ||
        fullPath.endsWith('.md') ||
        fullPath.endsWith('.yaml') ||
        fullPath.endsWith('.toml') ||
        file === 'app.json' ||
        file === 'package.json'
      ) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        // Replace case-sensitive references
        if (content.includes('triphandy')) {
          content = content.replace(/triphandy/g, 'triphandy');
          modified = true;
        }
        if (content.includes('triphandy')) {
          content = content.replace(/triphandy/g, 'triphandy');
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

walkAndReplace(rootDir);
console.log("Done.");
