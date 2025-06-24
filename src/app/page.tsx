import Header from '@/components/ui/Header';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Reservations from '@/components/sections/Reservations';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section id="home">
        <Hero />
      </section>

      {/* Menu Preview Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Taste the Difference 🍔
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Every burger tells a story of premium ingredients and culinary passion
            </p>
            
            {/* Featured Menu Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Card 1 */}
              <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-4 border border-amber-100">
                <div className="relative h-40 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                  <div className="text-7xl group-hover:scale-125 transition-transform duration-500">🍔</div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md animate-pulse">
                      ⭐ Most Popular
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Bella Vista Classic</h3>
                  <p className="text-gray-600 mb-4">Our signature burger with aged cheddar and special sauce</p>
                  <div className="text-2xl font-bold text-amber-600">$14.99</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-4 border border-amber-100">
                <div className="relative h-40 bg-gradient-to-br from-red-200 to-orange-200 flex items-center justify-center">
                  <div className="text-7xl group-hover:scale-125 transition-transform duration-500">🥓</div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      🔥 Chef's Choice
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">BBQ Bacon Deluxe</h3>
                  <p className="text-gray-600 mb-4">Double patty with crispy bacon and BBQ sauce</p>
                  <div className="text-2xl font-bold text-amber-600">$17.99</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-4 border border-amber-100">
                <div className="relative h-40 bg-gradient-to-br from-green-200 to-lime-200 flex items-center justify-center">
                  <div className="text-7xl group-hover:scale-125 transition-transform duration-500">🥤</div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      🥤 Fresh
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Signature Shakes</h3>
                  <p className="text-gray-600 mb-4">Creamy milkshakes made with premium ice cream</p>
                  <div className="text-2xl font-bold text-amber-600">$5.99</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <a 
                href="/menu"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="relative flex items-center">
                  <span className="mr-3 text-2xl group-hover:animate-bounce">🍽️</span>
                  View Full Menu & Order Now
                  <span className="ml-3 text-2xl group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
                
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section id="about">
        <Features />
      </section>

      <section id="reservations">
        <Reservations />
      </section>
      
      <section id="contact">
        <Contact />
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-50 space-y-4">
        <a
          href="https://wa.me/1234567890"
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 hover:bg-green-600 group"
        >
          <span className="text-2xl group-hover:animate-pulse">💬</span>
        </a>
        
        <a
          href="tel:+1234567890"
          className="flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 hover:bg-blue-600 group"
        >
          <span className="text-2xl group-hover:animate-bounce">📞</span>
        </a>
      </div>
    </main>
  );
}