import React, { useState } from 'react';
import {
  ShoppingBag,
  CreditCard,
  DollarSign,
  Receipt,
  Plus,
  Minus,
  Trash2,
  Check,
  Coffee,
  Sparkles,
  Percent
} from 'lucide-react';
import {
  CartItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
  addToCart,
  updateQuantity,
  removeFromCart
} from '../../utils/cart';

interface MenuProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  badge?: string;
}

export const POSDashboardMockup: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([
    { id: 'p1', name: 'Artisan Country Sourdough', category: 'Bread', price: 6.5, quantity: 1 },
    { id: 'p2', name: 'Almond Flaky Croissant', category: 'Pastry', price: 4.25, quantity: 2 },
    { id: 'p3', name: 'Oat Milk Flat White', category: 'Coffee', price: 4.75, quantity: 1 }
  ]);
  const [saleCompleted, setSaleCompleted] = useState<boolean>(false);

  const menuItems: MenuProduct[] = [
    { id: 'p1', name: 'Artisan Country Sourdough', category: 'Bread', price: 6.5, badge: 'Organic' },
    { id: 'p2', name: 'Almond Flaky Croissant', category: 'Pastry', price: 4.25, badge: 'Popular' },
    { id: 'p3', name: 'Oat Milk Flat White', category: 'Coffee', price: 4.75 },
    { id: 'p4', name: 'Cardamom Cinnamon Bun', category: 'Pastry', price: 3.85 },
    { id: 'p5', name: 'Avocado & Herb Focaccia', category: 'Bread', price: 5.5 },
    { id: 'p6', name: 'Matcha Ceremonial Latte', category: 'Coffee', price: 5.25 }
  ];

  const categories = ['All', 'Bread', 'Pastry', 'Coffee'];

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const subtotal = calculateSubtotal(cart);
  const tax = calculateTax(subtotal, 0.08);
  const total = calculateTotal(subtotal, tax);

  const handleAddItem = (item: MenuProduct) => {
    setCart((prev) => addToCart(prev, item));
    if (saleCompleted) setSaleCompleted(false);
  };

  const handleCompleteSale = () => {
    if (cart.length === 0) return;
    setSaleCompleted(true);
    setTimeout(() => {
      setSaleCompleted(false);
      setCart([]);
    }, 2400);
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#18102B] text-[#29213D] dark:text-[#F8FAFC] rounded-2xl border border-[#E4E9E1] dark:border-[#2C1C4E] shadow-2xl overflow-hidden font-sans text-xs transition-colors duration-200">
      {/* Top POS Header */}
      <div className="bg-[#F7F4FF] dark:bg-[#0F0A1C] border-b border-[#E4E9E1] dark:border-[#2C1C4E] px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7756D9]/50 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]/50 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E8B45]/50 inline-block" />
          </div>
          <div className="h-4 w-px bg-[#E4E9E1] dark:bg-[#2C1C4E] mx-1" />
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#29213D] dark:text-[#F8FAFC]">
            <ShoppingBag className="w-3.5 h-3.5 text-[#7756D9] dark:text-[#A78BFA]" />
            <span>Ravo POS · Counter Terminal #01 (Bakery & Café)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="bg-white dark:bg-[#18102B] border border-[#E4E9E1] dark:border-[#2C1C4E] px-2 py-0.5 rounded text-[#29213D] dark:text-[#F8FAFC]">
            Cashier: Clara V.
          </span>
          <span className="bg-[#7756D9] text-white px-2 py-0.5 rounded font-semibold">
            Register Open
          </span>
        </div>
      </div>

      {/* Main Grid: Menu Grid on Left, Ticket Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px]">
        {/* Left Column: Menu Categories & Grid (7 cols) */}
        <div className="lg:col-span-7 p-3.5 sm:p-4 border-b lg:border-b-0 lg:border-r border-[#E4E9E1] dark:border-[#2C1C4E] space-y-3 bg-[#FCFCFD] dark:bg-[#130B24]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#7756D9] text-white shadow-sm'
                    : 'bg-white dark:bg-[#1F1538] border border-[#E4E9E1] dark:border-[#2C1C4E] text-[#68736B] dark:text-[#A78BFA] hover:text-[#29213D] dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleAddItem(item)}
                className="bg-white dark:bg-[#18102B] border border-[#E4E9E1] dark:border-[#2C1C4E] hover:border-[#7756D9]/50 dark:hover:border-[#A78BFA]/50 hover:shadow-md p-2.5 rounded-xl text-left transition-all flex flex-col justify-between group active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8] font-medium">{item.category}</span>
                    {item.badge && (
                      <span className="text-[9px] font-semibold text-[#7756D9] dark:text-[#A78BFA] bg-[#F7F4FF] dark:bg-[#7756D9]/30 px-1.5 py-0.2 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-[11px] text-[#29213D] dark:text-[#F8FAFC] block mt-1 leading-snug line-clamp-2">
                    {item.name}
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between font-mono">
                  <span className="font-bold text-[#7756D9] dark:text-[#A78BFA] text-xs">
                    {formatCurrency(item.price)}
                  </span>
                  <span className="w-5 h-5 rounded-md bg-[#F7F4FF] dark:bg-[#7756D9]/30 group-hover:bg-[#7756D9] group-hover:text-white text-[#7756D9] dark:text-[#A78BFA] flex items-center justify-center transition-colors">
                    <Plus className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-[#F7F4FF] dark:bg-[#18102B] rounded-xl p-2.5 border border-[#7756D9]/15 dark:border-[#7756D9]/30 flex items-center justify-between text-[10px]">
            <span className="text-[#29213D] dark:text-[#F8FAFC] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#7756D9] dark:text-[#A78BFA]" />
              Tap item to add to live guest bill
            </span>
            <span className="text-[#7756D9] dark:text-[#A78BFA] font-mono font-semibold">Touch Optimised</span>
          </div>
        </div>

        {/* Right Column: Live Order Ticket (5 cols) */}
        <div className="lg:col-span-5 p-3.5 sm:p-4 flex flex-col justify-between bg-white dark:bg-[#18102B] space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E9E1] dark:border-[#2C1C4E]">
              <div>
                <span className="font-bold text-xs text-[#29213D] dark:text-[#F8FAFC] block">Current Order #108</span>
                <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8]">Dine-in / Counter Tab</span>
              </div>
              <button
                onClick={() => setCart([])}
                className="text-[10px] text-[#68736B] dark:text-[#94A3B8] hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1"
                disabled={cart.length === 0}
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-[#E4E9E1] dark:divide-[#2C1C4E] max-h-[180px] overflow-y-auto mt-1">
              {cart.length === 0 ? (
                <div className="py-8 text-center text-[#68736B] dark:text-[#94A3B8]">
                  <ShoppingBag className="w-8 h-8 mx-auto text-[#7756D9]/40 mb-1" />
                  <p className="text-[11px]">Ticket is empty</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Click any menu item to begin</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-2 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-[#29213D] dark:text-[#F8FAFC] block truncate text-[11px]">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8] font-mono">
                        {formatCurrency(item.price)} each
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setCart(updateQuantity(cart, item.id, -1))}
                        className="w-5 h-5 rounded border border-[#E4E9E1] dark:border-[#2C1C4E] hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center text-[#68736B] dark:text-[#94A3B8]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="w-5 text-center font-bold font-mono text-[11px] tabular-nums text-[#29213D] dark:text-[#F8FAFC]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => setCart(updateQuantity(cart, item.id, 1))}
                        className="w-5 h-5 rounded border border-[#E4E9E1] dark:border-[#2C1C4E] hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center text-[#68736B] dark:text-[#94A3B8]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                      <span className="font-mono font-bold text-[#29213D] dark:text-[#F8FAFC] text-[11px] w-12 text-right tabular-nums">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Subtotals & Pay Action */}
          <div className="border-t border-[#E4E9E1] dark:border-[#2C1C4E] pt-2.5 space-y-1.5 font-mono">
            <div className="flex justify-between text-[11px] text-[#68736B] dark:text-[#94A3B8]">
              <span>Subtotal:</span>
              <span className="tabular-nums text-[#29213D] dark:text-[#F8FAFC]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-[#68736B] dark:text-[#94A3B8]">
              <span>Tax (8% VAT):</span>
              <span className="tabular-nums text-[#29213D] dark:text-[#F8FAFC]">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#29213D] dark:text-[#F8FAFC] pt-1 border-t border-dashed border-slate-200 dark:border-slate-800">
              <span>Total Due:</span>
              <span className="text-[#7756D9] dark:text-[#A78BFA] text-base tabular-nums">{formatCurrency(total)}</span>
            </div>

            {/* Payment & Action Button */}
            <div className="pt-2 font-sans">
              {saleCompleted ? (
                <div className="w-full py-2 bg-emerald-600 text-white rounded-xl text-center font-semibold text-xs flex items-center justify-center gap-1.5 animate-in fade-in duration-200 shadow-md">
                  <Check className="w-4 h-4" />
                  <span>Sale Reconciled & Receipt Printed!</span>
                </div>
              ) : (
                <button
                  onClick={handleCompleteSale}
                  disabled={cart.length === 0}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    cart.length > 0
                      ? 'bg-[#7756D9] hover:bg-[#6442c5] text-white shadow-md active:scale-[0.99]'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Charge {formatCurrency(total)} (Cash / Card)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Illustrative Footer */}
      <div className="bg-[#F7F4FF] dark:bg-[#0F0A1C] border-t border-[#E4E9E1] dark:border-[#2C1C4E] px-4 py-1.5 flex items-center justify-between text-[10px] text-[#68736B] dark:text-[#94A3B8]">
        <span>Illustrative POS preview · Real-time client-side calculation</span>
        <span className="font-mono text-[#7756D9] dark:text-[#A78BFA]">Terminal Sync: Active</span>
      </div>
    </div>
  );
};
