/**
 * Debug script to test Next.js routing behavior
 * This will help confirm that the issue is with file location
 */

const fs = require('fs');
const path = require('path');

console.log('=== Next.js Routing Debug ===\n');

// Check current file structure
console.log('Current kunnskapsbank page location:');
const currentPath = path.resolve(__dirname, 'src/components/modules/kunnskapsbank/page.tsx');
console.log(`- ${currentPath}`);
console.log(`- File exists: ${fs.existsSync(currentPath)}\n`);

console.log('Expected Next.js app router location:');
const expectedPath = path.resolve(__dirname, 'src/app/kunnskapsbank/page.tsx');
console.log(`- ${expectedPath}`);
console.log(`- File exists: ${fs.existsSync(expectedPath)}\n`);

console.log('Analysis:');
console.log('- Next.js App Router requires route files to be in src/app directory');
console.log('- Current file is in src/components/modules/kunnskapsbank/');
console.log('- This explains the 404 error - Next.js cannot find the route file in the expected location');
console.log('- The sub-routes (sametinget, bedrifter, organisasjoner) are also incorrectly placed\n');

console.log('Recommended fix:');
console.log('1. Move src/components/modules/kunnskapsbank/page.tsx to src/app/kunnskapsbank/page.tsx');
console.log('2. Move all sub-route files to their corresponding locations under src/app/kunnskapsbank/');