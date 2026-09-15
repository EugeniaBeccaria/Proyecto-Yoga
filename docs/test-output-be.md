# Resultado de Ejecución: Tests Automatizados Backend (Unitario e Integración)

- **Fecha de ejecución:** 10/09/2026
- **Comando ejecutado:** `pnpm test`
- **Ubicación:** `backend/src/__tests__/`

```text
PS C:\Users\Admin\Proyecto-Yoga\backend> pnpm test

> yogastudio@1.0.0 test C:\Users\Admin\Proyecto-Yoga\backend
> cross-env NODE_OPTIONS=--experimental-vm-modules npx jest --config jest.config.cjs

(node:6392) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  src/__tests__/auth.service.unit.test.ts (5.829 s)
  ● Console

    console.log
      [dotenv@17.3.1] injecting env (9) from .env.test -- tip: 🔐 prevent committing .env to code: [https://dotenvx.com/precommit](https://dotenvx.com/precommit)

      at _log (node_modules/dotenv/lib/main.js:139:11)

    console.log
      [dotenv@17.3.1] injecting env (13) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`

      at _log (node_modules/dotenv/lib/main.js:139:11)

(node:18868) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  src/__tests__/auth.integration.test.ts (10.401 s)
  ● Console
                                                                                                      
    console.log                                                                                      
      [dotenv@17.3.1] injecting env (9) from .env.test -- tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }                                                                                                      
                                                                                                      
      at _log (node_modules/dotenv/lib/main.js:139:11)

    console.log
      [dotenv@17.3.1] injecting env (0) from .env.test -- tip: 🛠️  run anywhere with `dotenvx run  -- yourcommand`

      at _log (node_modules/dotenv/lib/main.js:139:11)
    console.log
      [dotenv@17.3.1] injecting env (13) from .env -- tip: 🤖 agentic secret storage: [https://dotenvx.com/as2](https://dotenvx.com/as2)

      at _log (node_modules/dotenv/lib/main.js:139:11)

    console.log
      [dotenv@17.3.1] injecting env (0) from .env -- tip: 🛡️ auth for agents: [https://vestauth.com](https://vestauth.com)

      at _log (node_modules/dotenv/lib/main.js:139:11)


Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        12.092 s
Ran all test suites.