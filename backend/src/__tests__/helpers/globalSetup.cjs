// globalSetup.cjs — se ejecuta UNA SOLA VEZ antes de todos los tests
// Carga las variables de .env.test en process.env
const path = require('path');
// __dirname = backend/src/__tests__/helpers/ → subir 3 niveles para llegar a backend/
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env.test') });

module.exports = async function globalSetup() {
  console.log('\n🧪 [Jest] Cargando .env.test...');
  console.log(`   BD de test: ${process.env.DB_NAME} @ ${process.env.DB_HOST}:${process.env.DB_PORT}`);
};
