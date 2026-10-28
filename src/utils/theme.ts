export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'ravo_labs_theme';

/**
 * Validates if a given string is a valid ThemeMode.
 */
export function isValidTheme(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

/**
 * Determines the effective active theme given a stored preference and system dark mode status.
 */
export function resolveEffectiveTheme(
  storedPreference: string | null | undefined,
  systemPrefersDark: boolean
): ThemeMode {
  if (storedPreference && isValidTheme(storedPreference)) {
    return storedPreference;
  }
  return systemPrefersDark ? 'dark' : 'light';
}

/**
 * Computes the next theme mode when toggled.
 */
export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}

/**
 * Generates the CSS classes/attributes to apply to document root.
 */
export function getThemeRootConfig(theme: ThemeMode): {
  isDark: boolean;
  className: string;
  colorScheme: 'dark' | 'light';
  ariaLabel: string;
} {
  const isDark = theme === 'dark';
  return {
    isDark,
    className: isDark ? 'dark' : '',
    colorScheme: isDark ? 'dark' : 'light',
    ariaLabel: isDark ? 'Switch to light mode' : 'Switch to dark mode'
  };
}
