import { test, expect } from '@playwright/test';

test.describe('Pruebas E2E - Flujo de Navegación e Iniciar Sesión', () => {
  test('debe cargar la página de inicio y verificar elementos principales', async ({ page }) => {
    // 1. Ir a la ruta principal
    await page.goto('/');

    // 2. Verificar que el navbar esté visible y contenga la marca / logo
    const navbar = page.locator('header.navbar');
    await expect(navbar).toBeVisible();
  });

  test('debe navegar a la página de Login y mostrar los campos del formulario', async ({ page }) => {
    // 1. Ir a la página de login
    await page.goto('/LoginPage');

    // 2. Verificar el título del formulario de login
    await expect(page.getByText('INICIAR SESIÓN')).toBeVisible();
    await expect(page.getByText('Ingrese a su cuenta para acceder a sus clases y talleres')).toBeVisible();

    // 3. Verificar los inputs de email y contraseña
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.getByRole('button', { name: /sign in/i });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('debe permitir ingresar credenciales en el formulario de login', async ({ page }) => {
    await page.goto('/LoginPage');

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');

    // Rellenar campos
    await emailInput.fill('usuario.prueba@example.com');
    await passwordInput.fill('Password123!');

    // Comprobar que los valores fueron ingresados correctamente
    await expect(emailInput).toHaveValue('usuario.prueba@example.com');
    await expect(passwordInput).toHaveValue('Password123!');
  });
});
