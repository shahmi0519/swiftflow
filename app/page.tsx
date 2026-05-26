'use client'

import { useState } from 'react'
import { Navbar } from '@/components/ecommerce/navbar'
import { Hero } from '@/components/ecommerce/hero'
import { ProductsSection } from '@/components/ecommerce/products-section'
import { CartDrawer } from '@/components/ecommerce/cart-drawer'
import { CheckoutPreview } from '@/components/ecommerce/checkout-preview'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/lib/mock-products'

export default function Home() {
  const { cart, cartCount, addToCart, removeFromCart, updateQuantity } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <Hero onExplore={() => window.scrollTo({ top: 800, behavior: 'smooth' })} />

      {/* Products Section */}
      <ProductsSection onAddToCart={handleAddToCart} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Preview */}
      {isCheckoutOpen && (
        <CheckoutPreview
          items={cart}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <span className="font-serif text-lg font-bold text-foreground">
                  SwiftFlow
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Premium tech gadgets and accessories for the discerning buyer.
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 SwiftFlow. All rights reserved.</p>
            <p>Developed By: Ahamed Shahmi</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
