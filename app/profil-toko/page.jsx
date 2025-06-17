import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from "@/app/ui/components/Layout";

export default function ProfilToko() {
  const storeImages = [
    '/assets/produk-a.jpg',
    '/assets/produk-b.jpg',
    '/assets/produk-c.jpg',
  ];

  const milestones = [
    {
      year: '2008',
      title: 'Awal Mula',
      description: 'Toko Kelontong Pak Rangga didirikan sebagai toko kelontong kecil di sudut jalan.'
    },
    {
      year: '2012',
      title: 'Perluasan Toko',
      description: 'Memperluas area toko dan menambah variasi produk untuk memenuhi kebutuhan pelanggan.'
    },
    {
      year: '2018',
      title: 'Modernisasi',
      description: 'Mengadopsi sistem kasir modern dan mulai melakukan digitalisasi inventaris.'
    },
    {
      year: '2023',
      title: 'Platform Online',
      description: 'Meluncurkan website dan layanan pesan antar untuk memperluas jangkauan layanan.'
    }
  ];

  return (
		<Layout>
			<div className="bg-white py-12">
				<div className="container mx-auto px-4">
					{/* Hero Section */}
					<div className="bg-green-600 rounded-lg overflow-hidden mb-16">
						<div className="flex flex-col md:flex-row">
							<div className="md:w-1/2 p-8 md:p-12 flex items-center">
								<div className="text-white">
									<h1 className="text-3xl md:text-4xl font-bold mb-4">Toko Kelontong Pak Rangga</h1>
									<p className="text-lg text-green-100 mb-6">
										Melayani kebutuhan sehari-hari masyarakat sejak 2008 dengan komitmen kualitas dan pelayanan terbaik.
									</p>
									<div className="flex space-x-4">
										<Link href="/katalog" className="bg-white text-green-600 hover:bg-green-100 font-medium py-2 px-6 rounded-md transition duration-300">
											Lihat Katalog
										</Link>
										<Link href="/kontak" className="border border-white text-white hover:bg-green-700 font-medium py-2 px-6 rounded-md transition duration-300">
											Kontak Kami
										</Link>
									</div>
								</div>
							</div>
							<div className="md:w-1/2 h-64 md:h-auto relative">
								{/* Placeholder untuk gambar toko */}
								<div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
									<span className="text-gray-600 font-medium">Foto Toko</span>
								</div>
							</div>
						</div>
					</div>

					{/* Tentang Kami Section */}
					<div className="mb-16">
						<div className="text-center mb-10">
							<h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang Kami</h2>
							<p className="text-lg text-gray-600 max-w-3xl mx-auto">
								Sejak didirikan pada tahun 2008, Toko Kelontong Pak Rangga telah menjadi bagian penting dari komunitas lokal, 
								menyediakan berbagai kebutuhan sehari-hari dengan harga terjangkau dan pelayanan yang ramah.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h3 className="text-xl font-semibold text-gray-800 mb-4">Visi Kami</h3>
								<p className="text-gray-600 mb-6">
									Menjadi toko kelontong terpercaya yang memberikan kemudahan akses untuk kebutuhan sehari-hari 
									dengan kualitas terbaik dan harga terjangkau bagi masyarakat sekitar.
								</p>

								<h3 className="text-xl font-semibold text-gray-800 mb-4">Misi Kami</h3>
								<ul className="list-disc pl-5 text-gray-600 space-y-2">
									<li>Menyediakan produk berkualitas dengan harga kompetitif</li>
									<li>Memberikan pelayanan yang ramah dan memuaskan</li>
									<li>Memastikan ketersediaan produk sesuai kebutuhan pelanggan</li>
									<li>Berperan aktif dalam kegiatan sosial komunitas sekitar</li>
									<li>Terus berinovasi dalam pelayanan dan pengelolaan bisnis</li>
								</ul>
							</div>
							<div className="grid grid-cols-2 gap-4">
								{storeImages.map((img, index) => (
									<div key={index} className={`relative h-40 ${index === 2 ? 'col-span-2' : ''} rounded-lg overflow-hidden`}>
										<Image
											src={img}
											alt={`Toko Kelontong Pak Rangga ${index + 1}`}
											fill
											className="object-cover"
										/>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Timeline Section */}
					<div className="mb-16">
						<h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Perjalanan Kami</h2>
						<div className="relative">
							{/* Timeline Line */}
							<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
							
							<div className="space-y-12">
								{milestones.map((milestone, index) => (
									<div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
										<div className="md:w-1/2"></div>
										<div className="flex items-center justify-center">
											<div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold z-10">
												{milestone.year}
											</div>
										</div>
										<div className="md:w-1/2 mt-4 md:mt-0 md:px-6">
											<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
												<h3 className="text-xl font-semibold text-gray-800 mb-2">{milestone.title}</h3>
												<p className="text-gray-600">{milestone.description}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Lokasi & Jam Operasional */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
						<div className="bg-gray-50 p-6 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">Lokasi</h3>
							<p className="text-gray-600 mb-4">
								Jl. Raya Pasar No. 123<br />
								Kecamatan Sukajadi<br />
								Kota Bandung, 40123<br />
								Indonesia
							</p>
							<div className="h-64 bg-gray-300 rounded-lg overflow-hidden relative">
								{/* Placeholder untuk peta lokasi */}
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-gray-600 font-medium">Peta Lokasi</span>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">Jam Operasional</h3>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-gray-600">Senin - Jumat</span>
									<span className="font-medium text-gray-800">07:00 - 21:00</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Sabtu</span>
									<span className="font-medium text-gray-800">07:00 - 22:00</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Minggu</span>
									<span className="font-medium text-gray-800">08:00 - 20:00</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Hari Libur Nasional</span>
									<span className="font-medium text-gray-800">08:00 - 20:00</span>
								</div>
							</div>
							<div className="mt-6">
								<h3 className="text-xl font-semibold text-gray-800 mb-4">Hubungi Kami</h3>
								<div className="space-y-2">
									<div className="flex items-center">
										<svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
										</svg>
										<span className="text-gray-600">+62 123 4567 890</span>
									</div>
									<div className="flex items-center">
										<svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
										</svg>
										<span className="text-gray-600">info@tokorangga.com</span>
									</div>
									<div className="flex items-center">
										<svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
										</svg>
										<span className="text-gray-600">+62 987 6543 210 (WhatsApp)</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* CTA Section */}
					<div className="bg-green-50 rounded-lg p-8 text-center">
						<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Kunjungi Toko Kami Sekarang</h2>
						<p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
							Kami siap melayani kebutuhan sehari-hari Anda dengan berbagai pilihan produk berkualitas dan harga terjangkau.
						</p>
						<div className="flex justify-center space-x-4">
							<Link href="/katalog" className="bg-green-600 text-white hover:bg-green-700 font-medium py-2 px-6 rounded-md transition duration-300">
								Lihat Katalog
							</Link>
							<Link href="/kontak" className="border border-green-600 text-green-600 hover:bg-green-100 font-medium py-2 px-6 rounded-md transition duration-300">
								Hubungi Kami
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
  );
}