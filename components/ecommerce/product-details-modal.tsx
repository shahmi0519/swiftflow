'use client'

import { Product } from '@/lib/mock-products'
import { Button } from '@/components/ui/button'
import { X, Heart, Share2, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

interface ProductDetailsModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailsModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorited, setIsFavorited] = useState(false)

  if (!isOpen || !product) return null

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 transition-opacity" />

      {/* Modal Content */}
      <div
        className="relative bg-card w-full md:w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] md:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-4 md:p-6 border-b border-border bg-card">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Product Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-secondary/30 to-muted rounded-xl h-80 flex items-center justify-center relative">
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}
              <div className="text-9xl">{product.image}</div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-4">
              {/* Category */}
              <p className="text-xs font-semibold text-accent uppercase tracking-wide">
                {product.category}
              </p>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="text-sm font-bold text-white bg-primary px-3 py-1 rounded">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 py-2 px-3 bg-muted rounded-lg">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-destructive'}`} />
                <span className="text-sm font-medium text-foreground">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted transition-colors text-foreground"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted transition-colors text-foreground"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-4">
                <h3 className="font-bold text-foreground mb-3">Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">✓</span>
                    <span>Premium quality construction</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">✓</span>
                    <span>2-year warranty included</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">✓</span>
                    <span>Free worldwide shipping</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">✓</span>
                    <span>30-day money-back guarantee</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      onAddToCart(product)
                    }
                    onClose()
                  }}
                  disabled={!product.inStock}
                  className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-white font-semibold"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={() => setIsFavorited(!isFavorited)}
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-muted"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorited ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-muted"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
