import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Slider = () => {
  const { showPage } = useContext(AppContext)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&h=700&fit=crop',
      title: 'Discover Amazing Artworks',
      description: 'Explore thousands of creative pieces from artists around the world.',
      buttonText: 'Explore Now',
      buttonAction: () => showPage('explore'),
      gradient: 'from-purple-900/80 to-indigo-800/80'
    },
    {
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=700&fit=crop',
      title: 'Connect with Talented Artists',
      description: 'Join our community of creators and art enthusiasts.',
      buttonText: 'Join Now',
      buttonAction: () => showPage('register'),
      gradient: 'from-amber-500/80 to-orange-600/80'
    },
    {
      image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=1200&h=700&fit=crop',
      title: 'Share Your Creativity',
      description: 'Showcase your artwork to a global audience.',
      buttonText: 'Upload Art',
      buttonAction: () => showPage('add-artwork'),
      gradient: 'from-teal-500/80 to-green-600/80'
    },
    {
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=700&fit=crop',
      title: 'Ethereal Dreams',
      description: 'Immerse yourself in stunning digital artworks.',
      buttonText: 'View Collection',
      buttonAction: () => showPage('explore'),
      gradient: 'from-pink-500/80 to-rose-600/80'
    },
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=700&fit=crop',
      title: 'Urban Expressions',
      description: 'Contemporary urban art capturing modern city life.',
      buttonText: 'Discover Urban',
      buttonAction: () => showPage('explore'),
      gradient: 'from-blue-500/80 to-cyan-600/80'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden hero-slide">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide absolute inset-0 flex items-center transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 text-white relative z-10 slide-content">
            <div className="slide-text-container">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-6">{slide.description}</p>
              <button 
                className="px-6 py-3 bg-amber-500 text-gray-800 font-bold rounded-lg hover:bg-amber-400 transition"
                onClick={slide.buttonAction}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot w-3 h-3 rounded-full bg-white transition ${
              index === currentSlide ? 'opacity-100' : 'opacity-50 hover:opacity-100'
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      
      <button 
        className="slider-prev absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition"
        onClick={prevSlide}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        className="slider-next absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition"
        onClick={nextSlide}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </section>
  )
}

export default Slider