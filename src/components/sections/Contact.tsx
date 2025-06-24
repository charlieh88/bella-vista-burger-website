'use client';

import { Button } from '@/components/ui/Button';

export default function Contact() {
  const restaurantAddress = "123 Main Street, Downtown District, Your City, State 12345";
  const restaurantCoords = "40.7128,-74.0060"; // NYC coordinates as example
  
  const getDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurantAddress)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Visit Us Today 📍
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Come experience the best burgers in town. We're open daily and ready to serve you!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-amber-100">
              <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Get In Touch</h3>
              
              <div className="space-y-8">
                <div className="group flex items-start hover:bg-amber-50 p-4 rounded-2xl transition-all duration-200">
                  <div className="text-3xl mr-6 group-hover:scale-110 transition-transform duration-200">📍</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-lg mb-2">Location</p>
                    <p className="text-gray-700 leading-relaxed">{restaurantAddress}</p>
                    <button 
                      onClick={getDirections}
                      className="mt-3 text-amber-600 hover:text-amber-700 font-medium flex items-center group/btn"
                    >
                      Get Directions 
                      <span className="ml-1 group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                    </button>
                  </div>
                </div>
                
                <div className="group flex items-start hover:bg-amber-50 p-4 rounded-2xl transition-all duration-200">
                  <div className="text-3xl mr-6 group-hover:scale-110 transition-transform duration-200">📞</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg mb-2">Phone</p>
                    <a href="tel:+15551234567" className="text-gray-700 hover:text-amber-600 transition-colors duration-200 text-lg">
                      (555) 123-4567
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Available during business hours</p>
                  </div>
                </div>
                
                <div className="group flex items-start hover:bg-amber-50 p-4 rounded-2xl transition-all duration-200">
                  <div className="text-3xl mr-6 group-hover:scale-110 transition-transform duration-200">⏰</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg mb-3">Hours</p>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span className="font-medium">Monday - Thursday</span>
                        <span>11:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Friday - Saturday</span>
                        <span>11:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Sunday</span>
                        <span>12:00 PM - 9:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group flex items-start hover:bg-amber-50 p-4 rounded-2xl transition-all duration-200">
                  <div className="text-3xl mr-6 group-hover:scale-110 transition-transform duration-200">✉️</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg mb-2">Email</p>
                    <a href="mailto:info@bellavistaburgrer.com" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">
                      info@bellavistaburger.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 space-y-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => window.location.href = 'tel:+15551234567'}
                  className="w-full transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-3 text-xl">📞</span>
                    Call Now: (555) 123-4567
                  </span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={getDirections}
                  className="w-full transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-3 text-xl">🗺️</span>
                    Get Directions
                    <span className="ml-2">→</span>
                  </span>
                </Button>

                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={() => window.location.href = '#reservations'}
                  className="w-full transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-3 text-xl">📅</span>
                    Make Reservation
                  </span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Google Maps Integration */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
            <div className="h-full min-h-[600px]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841189707414!2d-74.00601!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '600px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bella Vista Burger Co. Location"
                className="rounded-3xl"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Social Media & Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us & Stay Connected</h3>
            
            <div className="flex justify-center space-x-6 mb-8">
  <a 
    href="https://www.instagram.com/instagram/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group bg-pink-500 text-white p-4 rounded-full hover:bg-pink-600 transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
  >
    <span className="text-2xl group-hover:animate-bounce">📷</span>
  </a>
  <a 
    href="https://www.facebook.com/facebook/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
  >
    <span className="text-2xl group-hover:animate-bounce">📘</span>
  </a>
  <a 
    href="https://www.tripadvisor.com/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group bg-green-600 text-white p-4 rounded-full hover:bg-green-700 transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
  >
    <span className="text-2xl group-hover:animate-bounce">✈️</span>
  </a>
</div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl">
                <div className="text-3xl mb-3">🚗</div>
                <h4 className="font-semibold text-gray-900 mb-2">Free Parking</h4>
                <p className="text-gray-600 text-sm">Ample parking available behind the restaurant</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                <div className="text-3xl mb-3">♿</div>
                <h4 className="font-semibold text-gray-900 mb-2">Accessible</h4>
                <p className="text-gray-600 text-sm">Wheelchair accessible entrance and restrooms</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl">
                <div className="text-3xl mb-3">📶</div>
                <h4 className="font-semibold text-gray-900 mb-2">Free WiFi</h4>
                <p className="text-gray-600 text-sm">High-speed internet for all guests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}