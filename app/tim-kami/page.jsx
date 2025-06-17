import React from 'react';
import Image from 'next/image';
import Layout from "@/app/ui/components/Layout";

export default async function Page() {
	const timMembers = [
    {
      id: 1,
      nama: 'Andi Susanto',
      jabatan: 'Pemilik Toko',
      foto: '/assets/andi.jpg',
      deskripsi: 'Pendiri Toko Kelontong Pak Rangga dengan pengalaman lebih dari 15 tahun dalam bisnis ritel.'
    },
    {
      id: 2,
      nama: 'Budi Santoso',
      jabatan: 'Manajer Operasional',
      foto: '/assets/budi.jpg',
      deskripsi: 'Bertanggung jawab atas operasional harian toko dan manajemen stok barang.'
    },
    {
      id: 3,
      nama: 'Citra Dewi',
      jabatan: 'Kasir Utama',
      foto: '/assets/citra.jpg',
      deskripsi: 'Melayani pelanggan dengan ramah dan efisien dalam proses pembayaran.'
    },
    {
      id: 4,
      nama: 'Dewi Anggraini',
      jabatan: 'Staf Pelayanan Pelanggan',
      foto: '/assets/dewi.jpg',
      deskripsi: 'Memastikan kepuasan pelanggan dan menangani pertanyaan serta keluhan.'
    }
  ];

	return (
		<Layout>
			<div className="bg-white py-12">
				<div className="container mx-auto px-4">
					{/* Header Section */}
					<div className="text-center mb-10">
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tim Kami</h1>
						<p className="text-lg text-gray-600 max-w-xl mx-auto">
							Kenali orang-orang hebat di balik layanan Toko Kelontong Pak Rangga yang selalu siap melayani kebutuhan Anda.
						</p>
					</div>

					{/* Team Members Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{timMembers.map((member) => (
							<div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
								<div className="relative h-64 w-full">
									<Image
										src={member.foto}
										alt={member.nama}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-5">
									<h3 className="text-xl font-semibold text-gray-800">{member.nama}</h3>
									<p className="text-green-600 font-medium mb-2">{member.jabatan}</p>
									<p className="text-gray-600">{member.deskripsi}</p>
								</div>
							</div>
						))}
					</div>

					{/* Our Values Section */}
					<div className="mt-16">
						<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Nilai-Nilai Kami</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="bg-green-50 p-6 rounded-lg text-center">
								<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">Kualitas</h3>
								<p className="text-gray-600">Kami selalu menjaga kualitas produk yang kami jual untuk kepuasan pelanggan.</p>
							</div>
							<div className="bg-green-50 p-6 rounded-lg text-center">
								<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">Pelayanan</h3>
								<p className="text-gray-600">Kami berkomitmen untuk memberikan pelayanan terbaik kepada setiap pelanggan.</p>
							</div>
							<div className="bg-green-50 p-6 rounded-lg text-center">
								<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">Kepercayaan</h3>
								<p className="text-gray-600">Kami membangun kepercayaan dengan kejujuran dan transparansi dalam berbisnis.</p>
							</div>
						</div>
					</div>

					{/* Join Us Section */}
					<div className="mt-16 bg-green-600 text-white rounded-lg p-8 text-center">
						<h2 className="text-2xl md:text-3xl font-bold mb-4">Bergabunglah Dengan Tim Kami</h2>
						<p className="text-lg mb-6 max-w-2xl mx-auto">
							Kami selalu mencari individu berbakat dan berdedikasi untuk bergabung dengan tim kami. Jika Anda tertarik, silakan kirimkan CV Anda.
						</p>
						<button className="bg-white text-green-600 hover:bg-green-100 font-medium py-2 px-6 rounded-md transition duration-300">
							Lihat Lowongan
						</button>
					</div>
				</div>
			</div>
		</Layout>
	)
}