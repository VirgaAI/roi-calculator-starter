import { writeFileSync } from 'fs';
writeFileSync('./dist/index.cjs', "module.exports = require('./src/index.js');\n");
