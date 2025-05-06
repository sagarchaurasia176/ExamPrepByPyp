import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'B.Tech CSE, 3rd Year',
      content: 'These question papers helped me score 90+ in my semester exams. The collection is so well organized and saved me countless hours of searching.',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'B.Tech ECE, 2nd Year',
      content: 'The pattern analysis from previous papers gave me incredible insight into important topics. My preparation became so much more focused!',
      rating: 4
    },
    {
      id: 3,
      name: 'Amit Singh',
      role: 'B.Tech ME, Final Year',
      content: 'As a final year student, I wish I had found this resource earlier. The papers from last 5 years helped me identify repeating questions.',
      rating: 5
    }
  ]

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">What Students Say</h2>
          <div className="w-20 h-1 bg-green-400 mx-auto mt-4"></div>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Hear from students who transformed their exam preparation with our question bank
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <blockquote className="text-slate-300 mb-6">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials