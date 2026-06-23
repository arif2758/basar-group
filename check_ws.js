const fs = require('fs');
const content = fs.readFileSync('src/components/FamilyTree.tsx', 'utf-8');
const regex = /title:\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const name = match[1];
  if (name !== name.trim()) console.log('Whitespace issue:', `'${name}'`);
}
