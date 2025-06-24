'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
    console.log('Reservation submitted:', formData);
  };

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '5:00 PM', '5:30 PM', '6:00 PM',
    '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  if (isSubmitted) {
    return (
      <section id="reservations" className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-green-200">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Reservation Confirmed!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Thank you, {formData.name}! Your table for {formData.guests} on {formData.date} at {formData.time} has been reserved.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservation Details:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Date:</span> {formData.date}</p>
                  <p><span className="font-medium">Time:</span> {formData.time}</p>
                </div>
                <div>
                  <p><span className="font-medium">Guests:</span> {formData.guests}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                </div>
              </div>
              {formData.specialRequests && (
                <div className="mt-4">
                  <p><span className="font-medium">Special Requests:</span> {formData.specialRequests}</p>
                </div>
              )}
            </div>
            <p className="text-gray-600 mb-6">
              We'll send a confirmation email shortly. If you need to make changes, please call us at (555) 123-4567.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservations" className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Reserve Your Table 📅
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure your spot for an unforgettable dining experience. Book now to guarantee your table!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
          <div className="grid md:grid-cols-2">
            {/* Left side - Form */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Reservation Details</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests *</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                  >
                    {[1,2,3,4,5,6,7,8].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                    placeholder="Allergies, celebrations, seating preferences..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-6 rounded-xl font-medium text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-2">🍽️</span>
                    Reserve Table
                    <span className="ml-2">→</span>
                  </span>
                </button>
              </form>
            </div>

            {/* Right side - Info */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Reservation Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">⏰</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Operating Hours</h4>
                    <p className="text-gray-700">Mon-Thu: 11:00 AM - 10:00 PM</p>
                    <p className="text-gray-700">Fri-Sat: 11:00 AM - 11:00 PM</p>
                    <p className="text-gray-700">Sunday: 12:00 PM - 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-4">🎉</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Group Reservations</h4>
                    <p className="text-gray-700">For parties of 8+ guests, please call us directly at (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-4">📋</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cancellation Policy</h4>
                    <p className="text-gray-700">Please provide 2 hours notice for cancellations</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-4">💳</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Payment</h4>
                    <p className="text-gray-700">No deposit required. Pay when you dine with us!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}