"use client"; 
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/app/lib/services/auth.service";
import { getCurrentUser, isAdmin } from "@/app/lib/services/auth.service";
import { ProductsSkeletonLoader } from "@/app/ui/components/ProductSkeleton"
import Pagination from '@/app/ui/components/Pagination';

export default function Products(props) {
    // const { product } = props;
    // const products = product || [];
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [total, setTotal] = useState(0);
    
    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);


    useEffect(() => {
        const checkAuth = () => {
            if (!isAuthenticated()) {
                router.push('/');
                return;
            }
            const currentUser = getCurrentUser();
            if (!currentUser || !isAdmin()) {
                router.push('/');
                return;
            }

            const fetchProducts = async () => {
                try {
                    const response = await fetch(`/api/product?page=${page}&limit=${limit}`);
                    const data = await response.json();
                    if(response.status === 200) {
                        setTotal(data.total);
                        setProducts(data.data);
                        setFilteredProducts(data.data);
                    }
                } catch (error) {
                    console.error("Error fetching products:", error);
                    alert("Terjadi kesalahan saat mengambil data produk");
                }
            }
            fetchProducts();

            setUser(currentUser);

            setLoading(false);
        };
        checkAuth();

    }, [page]);

    useEffect(() => {
      const filtered = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleToDelete = async (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            try {
                const response = await fetch("/api/product?id=" + id, {
                    method: 'DELETE',
                });

                if (response.status === 200) {
                    alert("Produk berhasil dihapus");
                    router.refresh();
                } else {
                    alert("Gagal menghapus produk : ", response.message);
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Terjadi kesalahan saat menghapus produk");
            }
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <Link href="/admin" className="italic text-blue-500">&#x21d0; Kembali</Link>
                    <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
                    <Link href="/admin/products/create"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Tambah Produk
                    </Link>

                    {/* Search Bar */}
                    <div className="mb-4 mt-6">
                        <div className="relative">
                            <input
                            type="text"
                            placeholder="Cari berdasarkan nama produk..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            </div>
                        </div>
                        {searchTerm && (
                            <p className="text-sm text-gray-600 mt-2">
                            Menampilkan {filteredProducts.length} dari {products.length} produk
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <ProductsSkeletonLoader />
                    ) : (
                        <div className="mb-4 relative overflow-x-auto shadow-md sm:rounded-lg mt-8 transition-all duration-300">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nama Produk</th>
                                        <th scope="col" className="px-6 py-3">Katalog</th>
                                        <th scope="col" className="px-6 py-3">Stok</th>
                                        <th scope="col" className="px-6 py-3">Harga</th>
                                        <th scope="col" className="px-6 py-3">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id}
                                            className="odd:bg-white even:bg-gray-50  border-b  border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {product.name}
                                            </th>
                                            <td className="px-6 py-4">{product.category}</td>
                                            <td className="px-6 py-4">{product.stock}</td>
                                            <td className="px-6 py-4">Rp. {product.price}</td>
                                            <td className="px-6 py-4">
                                                <Link href={`/admin/products/edit/${product.id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                                <button
                                                    className="ml-4 font-medium text-red-600 hover:underline"
                                                    onClick={() => handleToDelete(product.id)}
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* PAGINATION UI */}
                    <Pagination path="admin/products" page={page} totalPages={totalPages} />
                </div>
            </div>
        </div>
    )
}