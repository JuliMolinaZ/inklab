/**
 * Analytics and Web Vitals tracking
 *
 * Integrates with Vercel Analytics and custom events
 */

/**
 * Track custom event
 */
export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // Vercel Analytics
  if (window.va) {
    window.va('track', name, properties);
  }

  // Google Analytics 4 (if configured)
  if (process.env.NEXT_PUBLIC_GA_ID && window.gtag) {
    window.gtag('event', name, properties);
  }

  // Custom analytics endpoint (optional)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: name, properties, timestamp: Date.now() }),
    }).catch(() => {
      // Silently fail
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', name, properties);
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string) {
  trackEvent('pageview', { url });
}

/**
 * Track portfolio piece view
 */
export function trackPortfolioView(slug: string, title: string) {
  trackEvent('portfolio_view', { slug, title });
}

/**
 * Track contact form submission
 */
export function trackContactSubmit(success: boolean) {
  trackEvent('contact_submit', { success });
}

/**
 * Track booking CTA click
 */
export function trackBookingClick(source: string) {
  trackEvent('booking_click', { source });
}

/**
 * Track social media click
 */
export function trackSocialClick(platform: string) {
  trackEvent('social_click', { platform });
}

/**
 * Track filter usage
 */
export function trackFilterChange(filter: string, value: string) {
  trackEvent('filter_change', { filter, value });
}

/**
 * Web Vitals tracking
 */
export function sendWebVitals(metric: { name: string; value: number; id: string; label: string }) {
  // Send to Vercel Analytics
  if (window.va) {
    window.va('track', 'Web Vitals', {
      metric: metric.name,
      value: metric.value,
      id: metric.id,
      label: metric.label,
    });
  }

  // Log poor metrics in development
  if (process.env.NODE_ENV === 'development') {
    const thresholds: Record<string, number> = {
      FCP: 1800,
      LCP: 2500,
      CLS: 0.1,
      FID: 100,
      INP: 200,
      TTFB: 600,
    };

    if (metric.value > (thresholds[metric.name] || Infinity)) {
      console.warn(`[Web Vitals] Poor ${metric.name}:`, metric.value);
    }
  }
}

// Type augmentation for window.va and gtag
declare global {
  interface Window {
    va?: (event: string, ...args: unknown[]) => void;
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}
