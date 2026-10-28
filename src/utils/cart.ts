export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export function calculateSubtotal(items: CartItem[]): number {
  const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return Math.round(sum * 100) / 100;
}

export function calculateTax(subtotal: number, taxRate = 0.08): number {
  return Math.round(subtotal * taxRate * 100) / 100;
}

export function calculateTotal(subtotal: number, tax: number): number {
  return Math.round((subtotal + tax) * 100) / 100;
}

export function formatCurrency(amount: number, symbol = '$'): string {
  return `${symbol}${amount.toFixed(2)}`;
}

export function addToCart(cart: CartItem[], newItem: Omit<CartItem, 'quantity'>): CartItem[] {
  const existingIndex = cart.findIndex((item) => item.id === newItem.id);
  if (existingIndex > -1) {
    return cart.map((item, idx) =>
      idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cart, { ...newItem, quantity: 1 }];
}

export function updateQuantity(cart: CartItem[], id: string, delta: number): CartItem[] {
  return cart
    .map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
}

export function removeFromCart(cart: CartItem[], id: string): CartItem[] {
  return cart.filter((item) => item.id !== id);
}
