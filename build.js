const fs = require('fs');

const requiredFiles = [
    'app.js',
    'package.json',
    'public/index.html',
    'public/index.css',
    'public/todo.js'
];

console.log('==========================================');
console.log('Student Task Manager Build');
console.log('==========================================');

console.log('Starting application build validation...');

for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
        console.error(`Build Failed: ${file} not found`);
        process.exit(1);
    }

    console.log(`✓ Found: ${file}`);
}

console.log('');
console.log('Application files validated successfully.');
console.log('Build completed successfully.');
console.log('==========================================');
