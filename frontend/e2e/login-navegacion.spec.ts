import { test, expect } from '@playwright/test';

test.describe('Prueba E2E Real (Sin Mocks) - Backend y Frontend en Vivo', () => {

  test('debe cargar la página de inicio y verificar la barra de navegación real', async ({ page }) => {
    await page.goto('/');

    const navbar = page.locator('header.navbar');
    await expect(navbar).toBeVisible();
  });

  test('debe navegar a la pantalla de Login y verificar los elementos del formulario real', async ({ page }) => {
    await page.goto('/LoginPage');
    await expect(page).toHaveURL(/.*LoginPage/);

    await expect(page.getByText('INICIAR SESIÓN')).toBeVisible();
    await expect(page.getByText('Ingrese a su cuenta para acceder a sus clases y talleres')).toBeVisible();

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.getByRole('button', { name: /sign in/i });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('debe permitir ingresar credenciales reales de prueba en los campos de login', async ({ page }) => {
    await page.goto('/LoginPage');

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');

    await emailInput.fill('admin@yoga.com');
    await passwordInput.fill('admin123');

    await expect(emailInput).toHaveValue('admin@yoga.com');
    await expect(passwordInput).toHaveValue('admin123');
  });

  test('debe procesar el envío contra la aplicación real y mostrar la validación', async ({ page }) => {
    await page.goto('/LoginPage');

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.getByRole('button', { name: /sign in/i });

    await emailInput.fill('admin@yoga.com');
    await passwordInput.fill('admin123');
    await submitButton.click();

    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
  });

});