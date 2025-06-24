import Header from '@/components/ui/Header';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Marco Rodriguez",
      role: "Head Chef & Owner",
      description: "20+ years of culinary experience, trained in Italian cuisine traditions",
      image: "👨‍🍳",
      specialty: "Signature burger creations"
    },
    {
      name: "Sarah Mitchell", 
      role: "Restaurant Manager",
      description: "Hospitality expert ensuring every guest has an exceptional experience",
      image: "👩‍💼",
      specialty: "Customer experience"
    },
    {
      name: "David Kim",
      role: "Sous Chef",
      description: "Artisan of fresh ingredients and innovative flavor combinations",
      image: "👨‍🍳",
      specialty: "Craft beer pairings"
    }
  ];

  const galleryImages = [
    { id: 1, title: "Restaurant Interior", image: "🏪", description: "Modern dining space with warm lighting" },
    { id: 2, title: "Open Kitchen", image: "🔥", description: "Watch our chefs create your perfect burger" },
    { id: 3, title: "Patio Seating", image: "🌳", description: "Outdoor dining with city views" },
    { id: 4, title: "Craft Bar", image: "🍻", description: "Local beer selection and cocktails" },
    { id: 5, title: "Fresh Ingredients", image: "🥬", description: "Daily delivered premium ingredients" },
    { id: 6, title: "Signature Burger", image: "🍔", description: "Our famous Bella Vista Classic" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
      <Header />
      
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About Bella Vista Burger Co. 🍔
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since 2018, we've been crafting extraordinary burgers with passion, premium ingredients, and innovative flavors that bring people together.
            </p>
          </div>

          {/* Restaurant Story */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 border border-amber-100">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    What started as a dream to create the perfect burger has evolved into a culinary destination. 
                    Our commitment to quality ingredients, innovative recipes, and exceptional service has made 
                    Bella Vista a beloved part of the community.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    Every burger tells a story - from our locally sourced beef to our house-made sauces. 
                    We believe great food brings people together, and that's exactly what we've created here.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Our journey began when Chef Marco Rodriguez decided to combine his Italian culinary heritage 
                    with American burger culture. The result? A unique dining experience that celebrates both 
                    tradition and innovation.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-8xl mb-6">🏆</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Award Winning</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>"Best Burger in the City" - Food & Wine Magazine 2023</p>
                    <p>"Top 10 Must-Visit Restaurants" - Local Eats 2023</p>
                    <p>"Excellence in Service" - Restaurant Association 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Experience Our Restaurant</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="group relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-square flex items-center justify-center p-8">
                    <div className="text-6xl group-hover:scale-125 transition-transform duration-500">
                      {image.image}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="font-semibold text-lg mb-1">{image.title}</h4>
                      <p className="text-sm text-gray-200">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200 transform hover:-translate-y-2">
                  <div className="p-8 text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {member.image}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-amber-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.description}</p>
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-700">
                        <span className="text-amber-600">Specialty:</span> {member.specialty}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-amber-100">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                <p className="text-gray-600">We source locally and support sustainable farming practices for a better tomorrow.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600">We're proud to be part of this community and give back whenever we can.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-600">Every dish is prepared with attention to detail and passion for perfection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}