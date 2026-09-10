// setupEnv.cjs — se ejecuta en cada worker de Jest ANTES de los tests
// Carga .env.test para que esté disponible cuando los módulos se importen
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env.test') });
