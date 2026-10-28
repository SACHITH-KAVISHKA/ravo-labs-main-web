import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidTheme,
  resolveEffectiveTheme,
  getNextTheme,
  getThemeRootConfig
} from './theme';

test('theme utility', async (t) => {
  await t.test('isValidTheme validates correctly', () => {
    assert.equal(isValidTheme('light'), true);
    assert.equal(isValidTheme('dark'), true);
    assert.equal(isValidTheme('system'), false);
    assert.equal(isValidTheme(null), false);
    assert.equal(isValidTheme(undefined), false);
    assert.equal(isValidTheme(123), false);
  });

  await t.test('resolveEffectiveTheme prioritizes valid stored preference', () => {
    assert.equal(resolveEffectiveTheme('dark', false), 'dark');
    assert.equal(resolveEffectiveTheme('light', true), 'light');
  });

  await t.test('resolveEffectiveTheme falls back to system preference when stored preference is missing or invalid', () => {
    assert.equal(resolveEffectiveTheme(null, true), 'dark');
    assert.equal(resolveEffectiveTheme(null, false), 'light');
    assert.equal(resolveEffectiveTheme(undefined, true), 'dark');
    assert.equal(resolveEffectiveTheme('invalid-value', true), 'dark');
    assert.equal(resolveEffectiveTheme('invalid-value', false), 'light');
  });

  await t.test('getNextTheme toggles back and forth', () => {
    assert.equal(getNextTheme('light'), 'dark');
    assert.equal(getNextTheme('dark'), 'light');
  });

  await t.test('getThemeRootConfig generates proper attributes', () => {
    const darkConfig = getThemeRootConfig('dark');
    assert.equal(darkConfig.isDark, true);
    assert.equal(darkConfig.className, 'dark');
    assert.equal(darkConfig.colorScheme, 'dark');
    assert.equal(darkConfig.ariaLabel, 'Switch to light mode');

    const lightConfig = getThemeRootConfig('light');
    assert.equal(lightConfig.isDark, false);
    assert.equal(lightConfig.className, '');
    assert.equal(lightConfig.colorScheme, 'light');
    assert.equal(lightConfig.ariaLabel, 'Switch to dark mode');
  });
});
