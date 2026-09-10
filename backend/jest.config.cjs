/** @type {import('jest').Config} */
module.exports = {
  // ts-jest con soporte ESM (el proyecto usa "type":"module")
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],

  // Resuelve imports .js → .ts en el código fuente de TypeScript
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.test.json',
      },
    ],
  },

  // Dónde buscar los tests
  testMatch: ['**/src/__tests__/**/*.test.ts'],

  // Tiempo máximo por test (la BD puede tardar en crear/limpiar tablas)
  testTimeout: 30000,

  // Carga .env.test DENTRO de cada worker (antes de que los módulos se importen)
  setupFiles: ['./src/__tests__/helpers/setupEnv.cjs'],
};

