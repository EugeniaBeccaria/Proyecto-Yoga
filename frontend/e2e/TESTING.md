# Guía de Tests End-to-End (E2E) con Playwright

Este documento detalla la estructura, configuración y cómo escribir y ejecutar las pruebas **End-to-End (E2E)** en el frontend utilizando **Playwright**.

---

## Stack Tecnológico de E2E

- **Framework:** `Playwright` (`@playwright/test`)
- **Navegador objetivo:** Chromium (Desktop Chrome)
- **Integración con servidor:** `playwright.config.ts` levanta automáticamente el servidor de desarrollo (`npm run dev`) en `http://localhost:5173`.

---

## Estructura de Archivos E2E

```text
frontend/
├── e2e/
│   ├── login-navegacion.spec.ts    # Especificación de pruebas E2E (Login y Navegación)
│   └── TESTING.md                  # Esta guía de documentación
└── playwright.config.ts            # Configuración global de Playwright
```

### Comandos de Ejecución

- **Ejecutar todos los tests E2E (modo Headless):**
  ```bash
  npm run test:e2e
  ```

- **Ejecutar tests en modo UI interactivo (con ventana visual):**
  ```bash
  npx playwright test --ui
  ```

- **Ver reporte visual HTML de la última ejecución:**
  ```bash
  npx playwright show-report
  ```

- **Ejecutar un archivo de test específico:**
  ```bash
  npx playwright test e2e/login-navegacion.spec.ts
  ```
