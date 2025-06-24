'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  included: boolean;
}

interface BurgerCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customizedBurger: any) => void;
  burger: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

export default function BurgerCustomizer({ isOpen, onClose, onAddToCart, burger }: BurgerCustomizerProps) {
  const [pattyOptions, setPattyOptions] = useState([
    { id: 'beef', name: 'Angus Beef Patty', price: 0, included: true },
    { id: 'double', name: 'Double Patty', price: 4.00, included: false },
    { id: 'turkey', name: 'Turkey Patty', price: 1.00, included: false },
    { id: 'veggie', name: 'Veggie Patty', price: 0, included: false },
  ]);

  const [cheeseOptions, setCheeseOptions] = useState([
    { id: 'cheddar', name: 'Aged Cheddar', price: 0, included: true },
    { id: 'swiss', name: 'Swiss Cheese', price: 0.50, included: false },
    { id: 'blue', name: 'Blue Cheese', price: 1.50, included: false },
    { id: 'pepper-jack', name: 'Pepper Jack', price: 1.00, included: false },
    { id: 'no-cheese', name: 'No Cheese', price: -1.00, included: false },
  ]);

  const [toppings, setToppings] = useState([
    { id: 'lettuce', name: 'Fresh Lettuce', price: 0, included: true },
    { id: 'tomato', name: 'Ripe Tomato', price: 0, included: true },
    { id: 'onion', name: 'Red Onion', price: 0, included: true },
    { id: 'pickles', name: 'Pickles', price: 0, included: false },
    { id: 'bacon', name: 'Crispy Bacon', price: 3.00, included: false },
    { id: 'avocado', name: 'Fresh Avocado', price: 2.50, included: false },
    { id: 'mushrooms', name: 'Sautéed Mushrooms', price: 2.00, included: false },
    { id: 'jalapenos', name: 'Jalapeños', price: 1.00, included: false },
  ]);

  const [sauces, setSauces] = useState([
    { id: 'special', name: 'Special Sauce', price: 0, included: true },
    { id: 'mayo', name: 'Mayo', price: 0, included: false },
    { id: 'mustard', name: 'Dijon Mustard', price: 0, included: false },
    { id: 'ketchup', name: 'Ketchup', price: 0, included: false },
    { id: 'bbq', name: 'BBQ Sauce', price: 0.50, included: false },
    { id: 'chipotle', name: 'Chipotle Mayo', price: 0.75, included: false },
  ]);

  const [bunOptions, setBunOptions] = useState([
    { id: 'brioche', name: 'Brioche Bun', price: 0, included: true },
    { id: 'whole-wheat', name: 'Whole Wheat Bun', price: 0.50, included: false },
    { id: 'gluten-free', name: 'Gluten-Free Bun', price: 2.00, included: false },
    { id: 'lettuce-wrap', name: 'Lettuce Wrap', price: 0, included: false },
  ]);

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const toggleOption = (category: string, optionId: string) => {
    const setters = {
      patty: setPattyOptions,
      cheese: setCheeseOptions,
      toppings: setToppings,
      sauces: setSauces,
      bun: setBunOptions,
    };

    const getters = {
      patty: pattyOptions,
      cheese: cheeseOptions,
      toppings: toppings,
      sauces: sauces,
      bun: bunOptions,
    };

    const setter = setters[category as keyof typeof setters];
    const options = getters[category as keyof typeof getters];

    if (['patty', 'cheese', 'bun'].includes(category)) {
      // Radio button behavior - only one selection
      setter(options.map(opt => ({ ...opt, included: opt.id === optionId })));
    } else {
      // Checkbox behavior - multiple selections
      setter(options.map(opt => 
        opt.id === optionId ? { ...opt, included: !opt.included } : opt
      ));
    }
  };

  const calculateTotalPrice = () => {
    let total = burger.price;
    
    [...pattyOptions, ...cheeseOptions, ...toppings, ...sauces, ...bunOptions]
      .filter(opt => opt.included)
      .forEach(opt => total += opt.price);
    
    return total * quantity;
  };

  const getSelectedOptions = () => {
    return {
      patty: pattyOptions.find(opt => opt.included),
      cheese: cheeseOptions.find(opt => opt.included),
      toppings: toppings.filter(opt => opt.included),
      sauces: sauces.filter(opt => opt.included),
      bun: bunOptions.find(opt => opt.included),
    };
  };

  const handleAddToCart = () => {
    const customizedBurger = {
      ...burger,
      customizations: getSelectedOptions(),
      specialInstructions,
      quantity,
      totalPrice: calculateTotalPrice() / quantity, // Price per item
      customizationText: generateCustomizationText(),
    };
    
    console.log('Adding customized burger to cart:', customizedBurger);
    onAddToCart(customizedBurger);
    onClose();
  };

  const generateCustomizationText = () => {
    const selected = getSelectedOptions();
    let text = `${selected.patty?.name} on ${selected.bun?.name}`;
    
    if (selected.cheese && selected.cheese.id !== 'no-cheese') {
      text += ` with ${selected.cheese.name}`;
    }
    
    const toppingNames = selected.toppings?.map(t => t.name).join(', ');
    if (toppingNames) {
      text += `, ${toppingNames}`;
    }
    
    const sauceNames = selected.sauces?.map(s => s.name).join(', ');
    if (sauceNames) {
      text += `, ${sauceNames}`;
    }
    
    return text;
  };

  if (!isOpen) return null;

  const OptionSection = ({ 
    title, 
    options, 
    category, 
    type = 'checkbox' 
  }: { 
    title: string; 
    options: CustomizationOption[]; 
    category: string; 
    type?: 'radio' | 'checkbox';
  }) => (
    <div className="mb-8">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:bg-amber-50 ${
              option.included 
                ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200' 
                : 'border-gray-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center">
              <input
                type={type}
                name={category}
                checked={option.included}
                onChange={() => toggleOption(category, option.id)}
                className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-gray-900 font-medium">{option.name}</span>
            </div>
            <span className={`font-semibold ${
              option.price > 0 ? 'text-green-600' : option.price < 0 ? 'text-red-600' : 'text-gray-500'
            }`}>
              {option.price > 0 ? `+$${option.price.toFixed(2)}` : 
               option.price < 0 ? `-$${Math.abs(option.price).toFixed(2)}` : 
               'Included'}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Customize Your {burger.name}</h3>
              <p className="text-amber-100">Make it exactly how you like it!</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-amber-200 text-3xl font-bold transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content - Made Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <OptionSection title="Choose Your Patty" options={pattyOptions} category="patty" type="radio" />
              <OptionSection title="Select Cheese" options={cheeseOptions} category="cheese" type="radio" />
              <OptionSection title="Pick Your Bun" options={bunOptions} category="bun" type="radio" />
            </div>
            
            <div>
              <OptionSection title="Add Toppings" options={toppings} category="toppings" />
              <OptionSection title="Choose Sauces" options={sauces} category="sauces" />
              
              {/* Special Instructions */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h4>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests? (e.g., extra crispy, well done, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at Bottom */}
        <div className="flex-shrink-0 border-t bg-gray-50 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Quantity</h4>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 text-gray-700 w-12 h-12 rounded-full hover:bg-gray-300 transition-colors duration-200 font-bold text-xl"
                >
                  -
                </button>
                <span className="mx-6 text-2xl font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors duration-200 font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg text-gray-600 mb-2">Total Price</p>
              <p className="text-4xl font-bold text-amber-600">${calculateTotalPrice().toFixed(2)}</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onClose}
              className="flex-1 py-4 text-lg"
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleAddToCart}
              className="flex-2 transform hover:scale-105 py-4 text-lg"
            >
              <span className="flex items-center justify-center">
                <span className="mr-3 text-xl">🛒</span>
                Add to Cart - ${calculateTotalPrice().toFixed(2)}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}