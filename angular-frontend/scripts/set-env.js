const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const apiUrl = process.env.API_URL || 'http://localhost:8080';

const envConfigFile = `export const environment = {
    production: false,
    apiUrl: '${apiUrl}'
};
`;

const envConfigFileProd = `export const environment = {
    production: true,
    apiUrl: '${process.env.API_URL_PROD || "/api"}'
};
`;

console.log('Generating environment files...');

fs.mkdirSync('./src/environments', { recursive: true });
fs.writeFileSync('./src/environments/environment.ts', envConfigFile);
fs.writeFileSync('./src/environments/environment.prod.ts', envConfigFileProd);

console.log('Environment files generated successfully!');
