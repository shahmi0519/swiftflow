'use client'

import { Product } from '@/lib/mock-products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface CheckoutItem extends Product {
  quantity: number
}

interface CheckoutPreviewProps {
  items: CheckoutItem[]
  onClose: () => void
}

export function CheckoutPreview({ items, onClose }: CheckoutPreviewProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = () => {
    alert('Order placed successfully! This is a demo checkout.')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card w-full max-w-4xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-white p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    s <= step
                      ? 'bg-white text-primary'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <ChevronRight className="w-5 h-5 text-white/50" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-muted text-foreground placeholder:text-muted-foreground"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-muted text-foreground placeholder:text-muted-foreground"
                    />
                    <Input
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-muted text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <Input
                    name="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-muted text-foreground placeholder:text-muted-foreground"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-muted text-foreground placeholder:text-muted-foreground"
                    />
                    <Input
                      name="zipCode"
                      placeholder="ZIP code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="bg-muted text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full gap-2 bg-primary hover:bg-primary/90 text-white"
                  size="lg"
                >
                  Continue to Payment
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">
                  Payment Information
                </h2>

                <div className="space-y-4">
                  <Input
                    name="cardNumber"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="bg-muted text-foreground placeholder:text-muted-foreground"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="bg-muted text-foreground placeholder:text-muted-foreground"
                    />
                    <Input
                      name="cardCvc"
                      placeholder="CVC"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="bg-muted text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-border text-foreground hover:bg-muted"
                    size="lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-white"
                    size="lg"
                  >
                    Review Order
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">
                  Review Your Order
                </h2>

                <div className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                    >
                      <div>
                        <p className="font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 p-4 bg-muted rounded-lg">
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
                    <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex-1 border-border text-foreground hover:bg-muted"
                    size="lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmitOrder}
                    className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-white"
                    size="lg"
                  >
                    Place Order
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-muted p-6 rounded-xl sticky top-20 space-y-4">
              <h3 className="font-bold text-foreground">Order Summary</h3>

              <div className="space-y-3 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-3 border-b border-border last:border-b-0"
                  >
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        x{item.quantity}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
