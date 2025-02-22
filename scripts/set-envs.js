const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const path = './src/environments/'
const filename = 'environment.ts';
const filenamedev = 'environment.development.ts';


const envFileContent = `
export const environment = {
  API_URL: "${ process.env['API_URL'] }",
  API_KEY: "${process.env['API_KEY']}",
};
`;

mkdirSync(path, { recursive: true });

writeFileSync( `${path}/${filename}`, envFileContent );
writeFileSync( `${path}/${filenamedev}`, envFileContent );