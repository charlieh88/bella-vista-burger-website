'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'apple' | 'google'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [hasCheckedCart, setHasCheckedCart] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    specialInstructions: ''
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  // Wait a moment for cart to load, then check if empty
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasCheckedCart(true);
      if (cart.length === 0 && !orderComplete) {
        window.location.href = '/menu';
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cart.length, orderComplete]);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.totalPrice || item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateDeliveryFee = () => {
    return orderType === 'delivery' ? 3.99 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDeliveryFee();
  };

  const handleInputChange = (section: 'customer' | 'card', field: string, value: string) => {
    if (section === 'customer') {
      setCustomerInfo(prev => ({ ...prev, [field]: value }));
    } else {
      setCardInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 3000);
  };

  // Show loading while we haven't checked the cart yet
  if (!hasCheckedCart) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🍔</div>
          <p className="text-xl text-gray-600">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Header />
        <div className="pt-20 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-green-200">
              <div className="text-8xl mb-6">🎉</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Order Confirmed!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your order! We're preparing your delicious meal.
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p><span className="font-medium">Order #:</span> BV-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    <p><span className="font-medium">Total:</span> ${calculateTotal().toFixed(2)}</p>
                    <p><span className="font-medium">Type:</span> {orderType === 'delivery' ? 'Delivery' : 'Pickup'}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Estimated Time:</span> {orderType === 'delivery' ? '35-45 minutes' : '15-20 minutes'}</p>
                    <p><span className="font-medium">Payment:</span> {paymentMethod === 'card' ? 'Credit Card' : paymentMethod}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => window.location.href = '/menu'}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 mr-4"
                >
                  Order Again
                </button>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-gray-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
      <Header />
      
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Checkout 🛒
            </h1>
            <p className="text-xl text-gray-600">
              Complete your order and get ready for delicious food!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-amber-100 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="border-b border-gray-200 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{item.image}</span>
                          <div>
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            {item.customizationText && (
                              <p className="text-sm text-gray-600 mt-1">{item.customizationText}</p>
                            )}
                            {item.specialInstructions && (
                              <p className="text-sm text-blue-600 mt-1">Note: {item.specialInstructions}</p>
                            )}
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-amber-600">
                          ${((item.totalPrice || item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>${calculateDeliveryFee().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-amber-600">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmitOrder} className="space-y-8">
                {/* Order Type */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        orderType === 'delivery'
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">🚚</div>
                      <div className="font-medium">Delivery</div>
                      <div className="text-sm text-gray-600">35-45 min • $3.99</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        orderType === 'pickup'
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">🏃</div>
                      <div className="font-medium">Pickup</div>
                      <div className="text-sm text-gray-600">15-20 min • Free</div>
                    </button>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {orderType === 'delivery' && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                        <input
                          type="text"
                          required
                          value={customerInfo.address}
                          onChange={(e) => handleInputChange('customer', 'address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          required
                          value={customerInfo.zipCode}
                          onChange={(e) => handleInputChange('customer', 'zipCode', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                    <textarea
                      value={customerInfo.specialInstructions}
                      onChange={(e) => handleInputChange('customer', 'specialInstructions', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Doorbell broken, call on arrival..."
                    ></textarea>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { id: 'card', icon: '💳', label: 'Credit Card' },
                      { id: 'apple', icon: '📱', label: 'Apple Pay' },
                      { id: 'google', icon: '🔵', label: 'Google Pay' },
                      { id: 'cash', icon: '💵', label: 'Cash' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          paymentMethod === method.id
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="text-sm font-medium">{method.label}</div>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card *</label>
                        <input
                          type="text"
                          required
                          value={cardInfo.nameOnCard}
                          onChange={(e) => handleInputChange('card', 'nameOnCard', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                        <input
                          type="text"
                          required
                          value={cardInfo.cardNumber}
                          onChange={(e) => handleInputChange('card', 'cardNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          required
                          value={cardInfo.expiryDate}
                          onChange={(e) => handleInputChange('card', 'expiryDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                        <input
                          type="text"
                          required
                          value={cardInfo.cvv}
                          onChange={(e) => handleInputChange('card', 'cvv', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-3">⏳</span>
                        Processing Order...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="mr-3">🚀</span>
                        Complete Order - ${calculateTotal().toFixed(2)}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}