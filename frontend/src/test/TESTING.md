# Guía de Tests Unitarios (Frontend)

Este documento detalla la configuración y ejecución de los tests unitarios de componentes en React.

---

## Stack Tecnológico

- **Runner:** `Vitest`
- **Entorno DOM:** `jsdom`
- **Librería de testing:** `@testing-library/react`
- **Aserciones DOM:** `@testing-library/jest-dom`
- **Eventos:** `@testing-library/user-event`

---

## Configuración del Proyecto

- `vite.config.ts`: Define el entorno `jsdom` y carga los archivos de setup.
- `src/test/setupTests.ts`: Configura los matchers de Jest-DOM.
- `package.json`: Scripts de ejecución.

---

## Comandos de Ejecución

- **Modo interactivo (watch):**
  ```bash
  npm run test
- **Ejecución simple:**
  ```bash
  npx vitest run
- **Reporte de cobertura:**
  ```bash
  npx vitest run --coverage