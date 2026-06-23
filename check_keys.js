const fs = require('fs');
const content = fs.readFileSync('src/components/FamilyTree.tsx', 'utf-8');
const regex = /title:\s*["']([^"']+)["']/g;
let match;
const names = [];
while ((match = regex.exec(content)) !== null) {
  names.push(match[1].trim());
}
const counts = {};
const duplicates = [];
names.forEach(n => {
  counts[n] = (counts[n] || 0) + 1;
  if (counts[n] === 2) duplicates.push(n);
});
console.log('Duplicate names:', duplicates);
