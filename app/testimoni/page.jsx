import Layout from "@/app/ui/components/Layout";
import Testimoni from "@/app/ui/components/Testimoni";

export default async function Page() {
  return (
		<Layout>
		<div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-green-800">Testimoni Pelanggan Toko Pak Rangga</h1>
          <p className="text-gray-600 mt-2">Apa yang pelanggan katakan tentang pengalaman berbelanja mereka</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Testimoni />
				
        {/* Stats Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Kepuasan Pelanggan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-gray-700">Pelanggan Puas</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-700">Pelanggan Tetap</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
              <p className="text-gray-700">Tahun Melayani</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">4.8</div>
              <p className="text-gray-700">Rating Rata-rata</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-green-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Bergabunglah dengan Pelanggan Lainnya!</h2>
          <p className="mb-6">Kunjungi toko kami untuk mendapatkan pengalaman berbelanja terbaik untuk kebutuhan pokok Anda.</p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-100 transition duration-300">
            Kunjungi Toko
          </button>
        </div>
        
        {/* Testimonial Form */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Bagikan Pengalaman Anda</h2>
          <div className="max-w-xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nama
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="name" 
                type="text" 
                placeholder="Nama Anda"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Status
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="role" 
                type="text" 
                placeholder="Contoh: Ibu Rumah Tangga, Karyawan, dll."
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testimonial">
                Testimoni Anda
              </label>
              <textarea 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" 
                id="testimonial" 
                placeholder="Bagikan pengalaman berbelanja Anda di Toko Pak Rangga"
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Rating
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    className="text-2xl text-gray-300 hover:text-yellow-400 focus:outline-none mr-1"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300" 
                type="button"
              >
                Kirim Testimoni
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
		</Layout>
	)
}