'use client'

interface Testimonial {
  text: string
  author: string
  rating: number
  company?: string
}

interface TestimonialsProps {
  title: string
  testimonials: Testimonial[]
}

export function Testimonials({ title, testimonials }: TestimonialsProps) {
  return (
    <section className='py-20 px-4 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16'>
          {title}
        </h2>
        
        <div className='grid md:grid-cols-2 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='bg-gray-50 p-8 rounded-lg'>
              <div className='flex mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className='text-yellow-400 text-xl'>⭐</span>
                ))}
              </div>
              <blockquote className='text-lg text-gray-700 mb-4 italic'>
                "{testimonial.text}"
              </blockquote>
              <cite className='text-gray-900 font-semibold'>
                — {testimonial.author}
                {testimonial.company && <span className='text-gray-500'>, {testimonial.company}</span>}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}