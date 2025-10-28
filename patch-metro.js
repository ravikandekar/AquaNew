// Patch for Node.js < 20.12.0 compatibility
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  'node_modules/@react-native/community-cli-plugin/dist/commands/start/runServer.js'
);

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace styleText usage with a fallback
  content = content.replace(
    /const (\w+) = \(0, _util\.styleText\)\('(\w+)', '([^']+)'\);/g,
    'const $1 = \'$3\';'
  );
  
  content = content.replace(
    /\(0, _util\.styleText\)\('(\w+)', '([^']+)'\)/g,
    '\'$2\''
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Metro bundler patched successfully for Node.js compatibility');
} catch (error) {
  console.error('❌ Failed to patch Metro bundler:', error.message);
  process.exit(1);
}
