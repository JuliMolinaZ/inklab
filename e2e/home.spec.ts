import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/');

    // Check hero heading
    await expect(page.getByRole('heading', { name: /Arte en tu piel/i })).toBeVisible();

    // Check CTA buttons
    await expect(page.getByRole('link', { name: /Reserva tu cita/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Ver portfolio/i })).toBeVisible();
  });

  test('should navigate to portfolio page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Ver portfolio/i }).first().click();

    await expect(page).toHaveURL('/portfolio');
    await expect(page.getByRole('heading', { name: /Portfolio/i })).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/InkLab Studio/);

    // Check meta description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu button should be visible
    const menuButton = page.getByRole('button', { name: /Toggle menu/i });
    await expect(menuButton).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check if main content is visible (LCP indicator)
    await expect(page.getByRole('main')).toBeVisible();

    // Basic performance check
    const performanceTiming = await page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
        loadComplete: timing.loadEventEnd - timing.loadEventStart,
      };
    });

    // Basic assertions (adjust thresholds as needed)
    expect(performanceTiming.domContentLoaded).toBeLessThan(2000);
  });
});
