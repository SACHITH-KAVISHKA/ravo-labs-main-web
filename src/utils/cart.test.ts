import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
  addToCart,
  updateQuantity,
  removeFromCart,
  CartItem
} from './cart';

test('calculateSubtotal handles empty and multiple items with precision', () => {
  assert.equal(calculateSubtotal([]), 0);
  const items: CartItem[] = [
    { id: '1', name: 'Sourdough Bread', category: 'Bakery', price: 6.5, quantity: 2 },
    { id: '2', name: 'Latte', category: 'Coffee', price: 4.25, quantity: 1 }
  ];
  assert.equal(calculateSubtotal(items), 17.25);
});

test('calculateTax computes standard tax with rounding', () => {
  assert.equal(calculateTax(100, 0.08), 8.0);
  assert.equal(calculateTax(17.25, 0.08), 1.38);
});

test('calculateTotal adds subtotal and tax correctly', () => {
  assert.equal(calculateTotal(17.25, 1.38), 18.63);
});

test('formatCurrency formats floating point correctly', () => {
  assert.equal(formatCurrency(18.63), '$18.63');
  assert.equal(formatCurrency(5), '$5.00');
});

test('addToCart adds new item and increments existing', () => {
  const initial: CartItem[] = [];
  const afterFirst = addToCart(initial, { id: 'c1', name: 'Croissant', category: 'Pastry', price: 3.5 });
  assert.equal(afterFirst.length, 1);
  assert.equal(afterFirst[0].quantity, 1);

  const afterSecond = addToCart(afterFirst, { id: 'c1', name: 'Croissant', category: 'Pastry', price: 3.5 });
  assert.equal(afterSecond.length, 1);
  assert.equal(afterSecond[0].quantity, 2);
});

test('updateQuantity increments, decrements, and removes at zero', () => {
  const items: CartItem[] = [{ id: '1', name: 'Item', category: 'General', price: 10, quantity: 2 }];
  const incremented = updateQuantity(items, '1', 1);
  assert.equal(incremented[0].quantity, 3);

  const decremented = updateQuantity(items, '1', -1);
  assert.equal(decremented[0].quantity, 1);

  const removed = updateQuantity(items, '1', -2);
  assert.equal(removed.length, 0);
});

test('removeFromCart deletes item by id', () => {
  const items: CartItem[] = [
    { id: '1', name: 'A', category: 'C', price: 1, quantity: 1 },
    { id: '2', name: 'B', category: 'C', price: 2, quantity: 1 }
  ];
  const afterRemove = removeFromCart(items, '1');
  assert.equal(afterRemove.length, 1);
  assert.equal(afterRemove[0].id, '2');
});
