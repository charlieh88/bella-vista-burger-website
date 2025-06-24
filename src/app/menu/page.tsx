'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import BurgerCustomizer from '@/components/ui/BurgerCustomizer';
import { useCart } from '@/contexts/CartContext';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  customizable?: boolean;
}

const menuData = {
  burgers: [
    {
      id: 1,
      name: "Bella Vista Classic",
      description: "Angus beef patty, aged cheddar, lettuce, tomato, red onion, special sauce",
      price: 14.99,
      image: "🍔",
      popular: true,
      customizable: true
    },
    {
      id: 2,
      name: "BBQ Bacon Deluxe", 
      description: "Double beef patty, crispy bacon, BBQ sauce, onion rings, smoked cheddar",
      price: 17.99,
      image: "🥓",
      popular: true
    },
    {
      id: 3,
      name: "Spicy Jalapeño Fire",
      description: "Beef patty, pepper jack cheese, jalapeños, chipotle mayo, avocado",
      price: 16.49,
      image: "🌶️",
      spicy: true
    },
    {
      id: 4,
      name: "Mushroom Swiss Gourmet",
      description: "Grass-fed beef, sautéed mushrooms, Swiss cheese, truffle aioli",
      price: 18.99,
      image: "🍄"
    }
  ],
  sides: [
    {
      id: 5,
      name: "Truffle Parmesan Fries",
      description: "Hand-cut fries with truffle oil and parmesan cheese",
      price: 8.99,
      image: "🍟",
      popular: true
    },
    {
      id: 6,
      name: "Onion Rings",
      description: "Beer-battered onion rings with chipotle dipping sauce",
      price: 7.49,
      image: "🧅"
    },
    {
      id: 7,
      name: "Loaded Nachos",
      description: "Tortilla chips, cheese sauce, jalapeños, sour cream, guacamole",
      price: 11.99,
      image: "🧀"
    }
  ],
  drinks: [
    {
      id: 8,
      name: "Craft Beer Selection",
      description: "Local IPA, Lager, or Stout on tap",
      price: 6.99,
      image: "🍺"
    },
    {
      id: 9,
      name: "Signature Milkshakes",
      description: "Vanilla, chocolate, or strawberry with whipped cream",
      price: 5.99,
      image: "🥤",
      popular: true
    }
  ]
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<'burgers' | 'sides' | 'drinks'>('burgers');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedBurger, setSelectedBurger] = useState<MenuItem | null>(null);
  
  // Use cart context instead of local state
  const { cart, addToCart, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  const handleItemClick = (item: MenuItem) => {
    if (item.customizable && item.id === 1) { // Bella Vista Classic
      setSelectedBurger(item);
      setIsCustomizerOpen(true);
    } else {
      addToCart(item);
    }
  };

  const handleCustomizedBurgerAdd = (customizedBurger: any) => {
    addToCart(customizedBurger);
  };

  const MenuCard = ({ item }: { item: MenuItem }) => (
    <div 
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200 transform hover:-translate-y-2 ${
        item.customizable ? 'cursor-pointer' : ''
      }`}
      onClick={() => item.customizable ? handleItemClick(item) : undefined}
    >
      {/* Popular Badge */}
      {item.popular && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md animate-pulse">
            ⭐ Popular
          </span>
        </div>
      )}
      
      {/* Customizable Badge */}
      {item.customizable && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            🎨 Customizable
          </span>
        </div>
      )}
      
      {/* Spicy Badge */}
      {item.spicy && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            🌶️ Spicy
          </span>
        </div>
      )}

      {/* Image/Icon Section */}
      <div className="relative h-32 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center overflow-hidden">
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {item.image}
        </div>
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        
        {/* Customizable Overlay */}
        {item.customizable && (
          <div className="absolute inset-0 bg-purple-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-sm font-medium text-purple-600">Click to Customize!</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors duration-200">
            {item.name}
          </h3>
          <div className="text-right">
            <span className="text-2xl font-bold text-amber-600">${item.price}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {item.description}
        </p>
        
        {/* Add to Cart Button */}
        {!item.customizable ? (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            className="group/btn relative w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-md hover:shadow-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">🛒</span>
              Add to Cart - ${item.price}
            </span>
            
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        ) : (
          <button 
            className="group/btn relative w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md hover:shadow-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">🎨</span>
              Customize & Add - ${item.price}+
            </span>
            
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        )}
      </div>
    </div>
  );

  const TabButton = ({ 
    label, 
    isActive, 
    onClick, 
    count 
  }: { 
    label: string; 
    isActive: boolean; 
    onClick: () => void; 
    count: number;
  }) => (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
        isActive 
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105' 
          : 'bg-white text-gray-600 hover:text-amber-600 hover:bg-amber-50 border border-gray-200 hover:border-amber-300'
      }`}
    >
      {label}
      <span className={`ml-2 px-2 py-1 rounded-full text-xs transition-all duration-200 ${
        isActive ? 'bg-white bg-opacity-20' : 'bg-gray-100'
      }`}>
        {count}
      </span>
      
      {/* Animated underline for active state */}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-white rounded-full"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
      <Header />
      
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-4 border-white"
      >
        <div className="relative">
          🛒
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce">
              {getTotalItems()}
            </span>
          )}
        </div>
      </button>

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-40 flex flex-col ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <div className="text-6xl mb-4">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
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
                        <p className="text-gray-600">${(item.totalPrice || item.price).toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg mx-2">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-green-500 text-white w-8 h-8 rounded-full hover:bg-green-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-amber-600">
                        ${((item.totalPrice || item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer - Fixed at Bottom */}
        {cart.length > 0 && (
          <div className="flex-shrink-0 border-t p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-amber-600">${getTotalPrice()}</span>
            </div>
            <button 
              onClick={() => window.location.href = '/checkout'}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
            >
              Proceed to Checkout 🚀
            </button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Burger Customizer Modal */}
      {selectedBurger && (
        <BurgerCustomizer
          isOpen={isCustomizerOpen}
          onClose={() => {
            setIsCustomizerOpen(false);
            setSelectedBurger(null);
          }}
          onAddToCart={handleCustomizedBurgerAdd}
          burger={selectedBurger}
        />
      )}

      {/* Main Content */}
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Delicious Menu 🍔
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Crafted with premium ingredients and served with passion. Click on our Bella Vista Classic to customize it to your liking!
            </p>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <TabButton
                label="🍔 Burgers"
                isActive={activeTab === 'burgers'}
                onClick={() => setActiveTab('burgers')}
                count={menuData.burgers.length}
              />
              <TabButton
                label="🍟 Sides"
                isActive={activeTab === 'sides'}
                onClick={() => setActiveTab('sides')}
                count={menuData.sides.length}
              />
              <TabButton
                label="🍺 Drinks"
                isActive={activeTab === 'drinks'}
                onClick={() => setActiveTab('drinks')}
                count={menuData.drinks.length}
              />
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuData[activeTab].map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}