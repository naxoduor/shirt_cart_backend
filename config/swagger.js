import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';

const swaggerPath = path.resolve('config/swagger.yaml'); // Adjust if the file is in a subfolder
const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, 'utf8'));


export { swaggerUi, swaggerDocument };
