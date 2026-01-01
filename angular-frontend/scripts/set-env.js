const fs = require('fs');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const envConfigFile = `export const environment = {
    production: false,
    apiUrl: '/api',
    aws: {
        accessKeyId: '${process.env.AWS_ACCESS_KEY_ID}',
        secretAccessKey: '${process.env.AWS_SECRET_ACCESS_KEY}',
        region: '${process.env.AWS_REGION}',
        bucketName: '${process.env.AWS_BUCKET_NAME}'
    }
};
`;

const envConfigFileProd = `export const environment = {
    production: true,
    apiUrl: '${process.env.API_URL_PROD || "/api"}',
    aws: {
        accessKeyId: '${process.env.AWS_ACCESS_KEY_ID}',
        secretAccessKey: '${process.env.AWS_SECRET_ACCESS_KEY}',
        region: '${process.env.AWS_REGION}',
        bucketName: '${process.env.AWS_BUCKET_NAME}'
    }
};
`;

console.log('Generating environment.ts and environment.prod.ts with environment variables...');

fs.writeFileSync('./src/environments/environment.ts', envConfigFile);
fs.writeFileSync('./src/environments/environment.prod.ts', envConfigFileProd);

console.log('Environment files generated successfully!');
