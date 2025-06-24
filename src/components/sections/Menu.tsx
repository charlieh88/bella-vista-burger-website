'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  spicy?: boolean;
}

const menuData = {
  burgers: [
    {
      id: 1,
      name: "Bella Vista Classic",
      description: "Angus beef patty, aged cheddar, lettuce, tomato, red onion, special sauce",
      price: 14.99,
      image: "🍔",
      popular: true
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

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'burgers' | 'sides' | 'drinks'>('burgers');

  const MenuCard = ({ item }: { item: MenuItem }) => (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200 transform hover:-translate-y-2">
      {/* Popular Badge */}
      {item.popular && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            ⭐ Popular
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
      <div className="relative h-32 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {item.image}
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <Button 
            variant="primary" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            Quick Add
          </Button>
        </div>
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
        <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-md hover:shadow-lg">
          Add to Order - ${item.price}
        </button>
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
      className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105' 
          : 'bg-white text-gray-600 hover:text-amber-600 hover:bg-amber-50 border border-gray-200'
      }`}
    >
      {label}
      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
        isActive ? 'bg-white bg-opacity-20' : 'bg-gray-100'
      }`}>
        {count}
      </span>
    </button>
  );

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Delicious Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Crafted with premium ingredients and served with passion. Every bite tells a story of flavor and quality.
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-amber-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Order? 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              Call us now or visit our restaurant for the freshest burgers in town!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="transform hover:scale-105">
                📞 Call (555) 123-4567
              </Button>
              <Button variant="outline" size="lg" className="transform hover:scale-105">
                📍 Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}