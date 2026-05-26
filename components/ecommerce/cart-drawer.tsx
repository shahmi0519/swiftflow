'use client'

import { Product } from '@/lib/mock-products'
import { Button } from '@/components/ui/button'
import { X, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'

interface CartItem extends Product {
  quantity: number
}

interface CartDrawerProps {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onCheckout: () => void
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shipping

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-4 md:p-6 border-b border-border bg-card">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="text-4xl">🛒</div>
              <p className="text-muted-foreground text-center">
                Your cart is empty
              </p>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-border text-foreground hover:bg-muted"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-muted/30 rounded-lg border border-border"
              >
                {/* Product Image */}
                <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                  {item.image}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${item.price} each
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="p-1 hover:bg-border rounded transition-colors text-foreground"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-border rounded transition-colors text-foreground"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <p className="font-bold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals */}
        {items.length > 0 && (
          <div className="sticky bottom-0 bg-card border-t border-border p-4 md:p-6 space-y-4">
            {/* Totals */}
            <div className="space-y-2 pb-4 border-b border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-primary font-semibold' : ''}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Button
                onClick={onCheckout}
                className="w-full gap-2 bg-primary hover:bg-primary/90 text-white font-semibold"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full border-border text-foreground hover:bg-muted"
              >
                Continue Shopping
              </Button>
            </div>

            {/* Free Shipping */}
            {subtotal < 100 && (
              <p className="text-xs text-muted-foreground text-center">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
