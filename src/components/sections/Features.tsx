export default function Features() {
  const features = [
    {
      title: "Premium Ingredients",
      description: "Locally sourced beef, artisanal buns, and fresh vegetables delivered daily.",
      icon: "🥩"
    },
    {
      title: "Craft Beer Selection", 
      description: "Curated selection of local craft beers and specialty cocktails.",
      icon: "🍺"
    },
    {
      title: "Outdoor Seating",
      description: "Beautiful patio dining with views of the city skyline.",
      icon: "🌅"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Bella Vista Burger Co.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Since 2018, we've been crafting extraordinary burgers with passion, premium ingredients, and innovative flavors that bring people together.
          </p>
          
          {/* Learn More Button */}
          <div className="flex justify-center">
            <a 
              href="/about"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span className="relative flex items-center">
                <span className="mr-3 text-2xl group-hover:animate-bounce">📖</span>
                Learn More About Us
                <span className="ml-3 text-2xl group-hover:translate-x-1 transition-transform duration-200">→</span>
              </span>
              
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Bella Vista?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200 transform hover:-translate-y-1">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors duration-200">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}