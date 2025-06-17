"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HeroCarousel() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const sliderData = [
    {
      id: 1,
      title: "Selamat Datang di Toko Kelontong Pak Rangga",
      description: "Menyediakan kebutuhan sehari-hari dengan harga terjangkau",
      imageSrc: "/images/nikola.jpeg",
      altText: "Tampilan depan toko"
    },
    {
      id: 2,
      title: "Promo Mingguan",
      description: "Dapatkan diskon hingga 20% untuk produk pilihan setiap minggunya",
      imageSrc: "/images/nikola.jpeg",
      altText: "Produk promo mingguan"
    },
    {
      id: 3,
      title: "Antar Gratis",
      description: "Belanja minimal Rp 100.000 dapatkan layanan antar gratis dalam radius 3 km",
      imageSrc: "/images/nikola.jpeg",
      altText: "Layanan antar"
    }
  ];

	// Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [sliderData.length]);

	// Slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

	return (
		<section className="relative overflow-hidden h-96 md:h-128">
        <div className="relative h-full">
          {sliderData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={slide.imageSrc}
                  alt={slide.altText}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-lg text-white">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
                      <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                      <Link href="/katalog" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                        Belanja Sekarang
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slider controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          {/* Slider indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
	)
}