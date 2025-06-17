"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function CreateProduct(props) {
    const { katalog } = props;
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [uploadError, setUploadError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
            const categories = await katalog;
            setCategories(categories); 
        } catch (error) {
            console.error("Gagal mengambil data produk:", error);
        }
      };

      fetchCategories();
    }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadError("");
  
    try {
      const formData = new FormData();
      formData.append("id", uuidv4() );
      formData.append("product", e.target.product.value);
      formData.append("category", e.target.category.value);
      formData.append("stock", e.target.stock.value);
      formData.append("price", e.target.price.value);
      formData.append("image", e.target.image.files[0]);
  
      const response = await fetch(`/api/product`, {
        method: "POST",
        body: formData,
      });
  
      if (response.status !== 201) {
        throw new Error(response.message);
      }
  
      const result = await response.json();
      if (result) {
        router.push("/admin/products");
      }
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold">Tambah Data Produk</h2>
              {uploadError && (
                <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 " role="alert">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Warning alert!</span> {uploadError}
                    </div>
                </div>
              )}
              <form className="flex flex-col gap-4 mt-4" onSubmit={handleAddProduct}>
                <div>
                  <div className="mb-2 block">
                    <label htmlFor="category">Kategori</label>
                  </div>
                  <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name="category" required>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id} className="text-black">
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <label htmlFor="product">Nama Produk</label>
                  </div>
                  <input id="product" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" required name="product" />
                </div>
                <div>
                  <div className="mb-2 block">
                    <label htmlFor="price">Harga Satuan</label>
                  </div>
                  <input id="price" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="number" required name="price" />
                </div>
                <div>
                  <div className="mb-2 block">
                    <label htmlFor="stock">Jumlah Stok</label>
                  </div>
                  <input id="stock" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="number" required name="stock" />
                </div>
                <div>
                  <label className="mb-2 block" htmlFor="image">
                    Upload file
                  </label>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50focus:outline-none" id="image" type="file" name="image"/>
                </div>
                <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Simpan'}
                </button>
              </form>
            </div>
          </div>
        </div>
    )
}