/**
 * Accessibility utilities
 *
 * Helpers for creating accessible components and experiences
 */

/**
 * Generate unique ID for accessibility
 */
let idCounter = 0;
export function generateId(prefix = 'id'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Get ARIA props for disclosure widgets (accordion, dropdown, etc.)
 */
export function getDisclosureProps(id: string, isExpanded: boolean) {
  return {
    button: {
      'aria-expanded': isExpanded,
      'aria-controls': `${id}-content`,
      id: `${id}-button`,
    },
    content: {
      id: `${id}-content`,
      'aria-labelledby': `${id}-button`,
      role: 'region',
    },
  };
}

/**
 * Get ARIA props for tabs
 */
export function getTabsProps(id: string, selectedIndex: number, _tabCount: number) {
  return {
    tabList: {
      role: 'tablist',
      'aria-label': 'Tabs',
    },
    tab: (index: number) => ({
      role: 'tab',
      id: `${id}-tab-${index}`,
      'aria-controls': `${id}-panel-${index}`,
      'aria-selected': index === selectedIndex,
      tabIndex: index === selectedIndex ? 0 : -1,
    }),
    panel: (index: number) => ({
      role: 'tabpanel',
      id: `${id}-panel-${index}`,
      'aria-labelledby': `${id}-tab-${index}`,
      tabIndex: 0,
      hidden: index !== selectedIndex,
    }),
  };
}

/**
 * Get ARIA props for dialog/modal
 */
export function getDialogProps(id: string, _title: string) {
  return {
    overlay: {
      'aria-hidden': true,
    },
    dialog: {
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': `${id}-title`,
      'aria-describedby': `${id}-description`,
    },
    title: {
      id: `${id}-title`,
    },
    description: {
      id: `${id}-description`,
    },
  };
}

/**
 * Trap focus within an element
 */
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', handleTabKey);

  // Focus first element
  firstElement?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Announce message to screen readers
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof document === 'undefined') return;

  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.textContent = message;

  document.body.appendChild(liveRegion);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(liveRegion);
  }, 1000);
}

/**
 * Check if element is visible to user
 */
export function isElementVisible(element: HTMLElement): boolean {
  if (!element) return false;

  const style = window.getComputedStyle(element);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    element.offsetWidth > 0 &&
    element.offsetHeight > 0
  );
}

/**
 * Get contrast ratio between two colors
 * Useful for checking WCAG contrast requirements
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    // Simplified luminance calculation
    const rgb = color.match(/\d+/g)?.map(Number) || [0, 0, 0];
    const [r = 0, g = 0, b = 0] = rgb.map((val) => {
      const sRGB = val / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standard
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if contrast ratio meets WCAG AAA standard
 */
export function meetsWCAGAAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}
