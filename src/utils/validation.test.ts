import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmail, validateDemoForm } from './validation';

test('validateEmail checks standard email patterns', () => {
  assert.equal(validateEmail('test@ravolabs.com'), true);
  assert.equal(validateEmail('sachith@gmail.com'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('@domain.com'), false);
  assert.equal(validateEmail('name@'), false);
});

test('validateDemoForm rejects incomplete forms', () => {
  const result = validateDemoForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.companyName);
  assert.ok(result.errors.workEmail);
  assert.ok(result.errors.product);
  assert.ok(result.errors.agreeToPolicy);
});

test('validateDemoForm accepts valid payload', () => {
  const validData = {
    fullName: 'David Fernando',
    companyName: 'Apex Petro Services',
    workEmail: 'david@apexpetro.com',
    product: 'fuel' as const,
    companySize: '51-200',
    message: 'Looking to modernize 4 fuel station branches.',
    agreeToPolicy: true
  };
  const result = validateDemoForm(validData);
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});
