'use client'

import { Product } from '@/lib/mock-products'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onViewDetails: (product: Product) => void
}

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-secondary/30 to-muted flex items-center justify-center cursor-pointer overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
              {product.badge}
            </span>
          </div>
        )}

        {/* Stock status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsFavorited(!isFavorited)
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : 'text-foreground'
            }`}
          />
        </button>

        {/* Product Image */}
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs font-semibold text-accent uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name */}
        <h3
          onClick={() => onViewDetails(product)}
          className="text-lg font-bold text-foreground line-clamp-2 hover:text-primary transition-colors cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating) ? '⭐' : '☆'
                }`}
              >
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-white font-semibold"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </Button>
      </div>
    </div>
  )
}
