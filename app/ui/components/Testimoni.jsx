"use client";
import { useState } from 'react';

export default function Testimoni() {
	const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: "Ibu Santi",
      role: "Pelanggan Tetap",
      image: "/api/placeholder/80/80",
      text: "Saya sudah berlangganan di Toko Pak Rangga selama 5 tahun. Harganya selalu terjangkau dan barangnya selalu segar. Pelayanannya juga ramah, saya sangat puas berbelanja di sini.",
      rating: 5,
      category: "regular"
    },
    {
      id: 2,
      name: "Bapak Hendra",
      role: "Pemilik Warung Makan",
      image: "/api/placeholder/80/80",
      text: "Toko Pak Rangga adalah supplier utama untuk warung makan saya. Bahan-bahan selalu berkualitas dan harganya kompetitif. Sangat membantu usaha saya.",
      rating: 5,
      category: "business"
    },
    {
      id: 3,
      name: "Ibu Dewi",
      role: "Ibu Rumah Tangga",
      image: "/api/placeholder/80/80",
      text: "Belanja sembako di Toko Pak Rangga sangat praktis. Mereka sekarang juga melayani pengantaran ke rumah, sangat membantu untuk saya yang memiliki kesibukan mengurus anak.",
      rating: 4,
      category: "regular"
    },
    {
      id: 4,
      name: "Bapak Joko",
      role: "Pelanggan",
      image: "/api/placeholder/80/80",
      text: "Toko Pak Rangga selalu menyediakan kebutuhan sehari-hari dengan lengkap. Tidak perlu pergi ke pasar jauh-jauh, semua ada di sini dengan harga yang wajar.",
      rating: 5,
      category: "regular"
    },
    {
      id: 5,
      name: "Ibu Ratna",
      role: "Pelanggan Baru",
      image: "/api/placeholder/80/80",
      text: "Baru sebulan berlangganan di Toko Pak Rangga dan sudah merasa sangat puas. Beras dan minyak goreng selalu tersedia dengan kualitas bagus. Recommended!",
      rating: 5,
      category: "new"
    },
    {
      id: 6,
      name: "Bapak Andi",
      role: "Pemilik Katering",
      image: "/api/placeholder/80/80",
      text: "Sebagai pengusaha katering, saya membutuhkan bahan berkualitas dengan harga grosir. Toko Pak Rangga menjadi partner tepercaya untuk bisnis saya.",
      rating: 5,
      category: "business"
    },
    {
      id: 7,
      name: "Ibu Maya",
      role: "Pelanggan Tetap",
      image: "/api/placeholder/80/80",
      text: "Sudah 3 tahun belanja di sini. Saya suka karena Pak Rangga selalu update produk baru dan diskonnya menguntungkan untuk keluarga saya.",
      rating: 4,
      category: "regular"
    },
    {
      id: 8,
      name: "Pak Budi",
      role: "Pensiunan",
      image: "/api/placeholder/80/80",
      text: "Di usia pensiun, saya sangat terbantu dengan layanan antar yang disediakan Toko Pak Rangga. Stafnya ramah dan selalu membantu memilihkan barang.",
      rating: 5,
      category: "regular"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === filter);
  return (
		<>
		{/* Featured Testimonial */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-xl p-8 relative">
            <div className="absolute -top-5 left-8 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              "
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-green-100" 
                />
                <h3 className="text-xl font-bold text-gray-800">{testimonials[activeIndex].name}</h3>
                <p className="text-green-600">{testimonials[activeIndex].role}</p>
                <div className="flex mt-2">
                  {renderStars(testimonials[activeIndex].rating)}
                </div>
              </div>
              
              <div className="md:w-2/3 md:pl-8">
                <p className="text-gray-700 text-lg leading-relaxed italic">"{testimonials[activeIndex].text}"</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                ←
              </button>
              <button 
                onClick={nextTestimonial}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                →
              </button>
            </div>
          </div>
        </div>
        
        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap justify-center">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 m-1 rounded-full transition duration-300 ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Semua Testimoni
          </button>
          <button 
            onClick={() => setFilter('regular')}
            className={`px-4 py-2 m-1 rounded-full transition duration-300 ${filter === 'regular' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Pelanggan Tetap
          </button>
          <button 
            onClick={() => setFilter('business')}
            className={`px-4 py-2 m-1 rounded-full transition duration-300 ${filter === 'business' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Pelanggan Bisnis
          </button>
          <button 
            onClick={() => setFilter('new')}
            className={`px-4 py-2 m-1 rounded-full transition duration-300 ${filter === 'new' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Pelanggan Baru
          </button>
        </div>
        
        {/* Testimonial Grid */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Testimoni Pelanggan Lainnya</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover" 
                />
                <div>
                  <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-green-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{testimonial.text}</p>
              <div className="flex">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
		</>
	)
}