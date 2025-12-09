import { expect, test } from '@playwright/test';
import { LoginPage } from '../../../Auth/tests/e2e/pages/LoginPage';
import { testUsers } from '../../../Auth/tests/e2e/fixtures/users';

test.describe('Navigation Module', () => {
  test.beforeEach(async ({ page }) => {
    // Authenticate before accessing dashboard
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUsers.valid.email, testUsers.valid.password);

    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display navigation items in main navigation', async ({
    page,
  }) => {
    // Wait for sidebar to be visible
    await expect(page.locator('[data-sidebar="sidebar"]')).toBeVisible();

    // Check that Dashboard link exists in main navigation
    const dashboardLink = page
      .locator('nav')
      .getByRole('link', { name: /dashboard/i });
    await expect(dashboardLink).toBeVisible();
  });
});