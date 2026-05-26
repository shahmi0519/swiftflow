'use client'

import { useState, useMemo } from 'react'
import { Product, PRODUCTS, CATEGORIES } from '@/lib/mock-products'
import { ProductCard } from './product-card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { ProductDetailsModal } from './product-details-modal'
import { ChevronDown, Search } from 'lucide-react'

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void
}

export function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState('popular')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchPrice && matchSearch
    })

    // Sort
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating)
      case 'newest':
        return filtered.reverse()
      case 'popular':
      default:
        return filtered.sort((a, b) => b.reviewCount - a.reviewCount)
    }
  }, [selectedCategory, priceRange, sortBy, searchQuery])

  return (
    <>
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Our Collection
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
              <p className="text-muted-foreground">
                Discover {filteredProducts.length} premium products
              </p>
              <div className="w-full sm:w-64 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="space-y-6 bg-card p-6 rounded-xl border border-border sticky top-20">
                {/* Category Filter */}
                <div>
                  <h3 className="font-bold text-foreground mb-4">Categories</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary/20 text-primary font-semibold'
                            : 'text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-bold text-foreground mb-4">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={3000}
                    step={50}
                    className="mb-4"
                  />
                  <div className="flex gap-2 text-sm">
                    <span className="text-muted-foreground">
                      ${priceRange[0]}
                    </span>
                    <span className="text-muted-foreground"> - </span>
                    <span className="text-muted-foreground">
                      ${priceRange[1]}
                    </span>
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-bold text-foreground mb-4">Stock Status</h3>
                  <label className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort Controls */}
              <div className="flex justify-between items-center mb-6">
                <div className="relative">
                  <Button
                    variant="outline"
                    className="gap-2 border-border text-foreground hover:bg-muted"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                  >
                    Sort by: {sortBy === 'popular' ? 'Popular' : sortBy === 'price-low' ? 'Price: Low to High' : sortBy === 'price-high' ? 'Price: High to Low' : sortBy === 'rating' ? 'Highest Rated' : 'Newest'}
                    <ChevronDown className="w-4 h-4" />
                  </Button>

                  {isSortOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                      {[
                        { value: 'popular', label: 'Most Popular' },
                        { value: 'newest', label: 'Newest' },
                        { value: 'price-low', label: 'Price: Low to High' },
                        { value: 'price-high', label: 'Price: High to Low' },
                        { value: 'rating', label: 'Highest Rated' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value)
                            setIsSortOpen(false)
                          }}
                          className="block w-full text-left px-4 py-3 hover:bg-muted text-foreground border-b border-border last:border-b-0"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onViewDetails={setSelectedProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No products found. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  )
}
