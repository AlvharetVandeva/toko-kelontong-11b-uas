"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { isAuthenticated, getCurrentUser } from '@/app/lib/services/auth.service';

export default function DetailProduct(props) {
    const { product } = props;
    const router = useRouter();
    const [load, setLoad] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const userData = getCurrentUser();

    useEffect(() => {
        if (!router.isReady) return;
        if (!isAuthenticated()) {
            router.push('/katalog');
            return;
        }

        setTotal(product.price * quantity)
    }, []);

    const addQty = () => {
        setQuantity(quantity + 1);
        setTotal(product.price * (quantity + 1))
    }

    const subQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotal(product.price * (quantity - 1))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        console.log(`User data:`, userData);

        const data = {
            id: uuidv4(),
            trxid: `#TRX-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '')}`,
            date: new Date().toISOString().split('T')[0],
            item: product.id,
            qty: quantity,
            customer: userData.id, 
            amount: total,
            status: "Selesai",
        };

        const response = await fetch('/api/beli', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        const result = await response.json();
        if (result.status === 201) {
            alert('Pembelian berhasil!');
            router.push('/katalog');
        } else {
            alert('Gagal melakukan pembelian, silahkan coba lagi.');
            setLoad(false);
            return;
        }
    }

    const imageUrl = product.image && product.image.startsWith('images') 
        ? `/${product.image}` 
        : product.image;

    return (
        <>
        <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <Link href="/katalog" className="italic text-blue-500">&#x21d0; Kembali</Link>
                        <h2 className="text-2xl font-bold">Detail Produk</h2>
                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2">
                            <div className="flex items-center">
                                <img className="w-sm h-full object-cover" src={`${imageUrl}`}  alt={product.name} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold">{product.name}</h3>
                                <p className="italic">{product.category}</p>
                                <p>{product.price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                                <p>{product.description}</p>
                                <div className="mt-4">
                                <form className="max-w-sm" onSubmit={handleSubmit}>
                                    <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah :</label>
                                    <div className="flex gap-2 items-center">
                                        <button onClick={subQty} type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900">-</button>
                                        <input type="number" id="qty" readOnly aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={quantity} required />
                                        <button onClick={addQty} type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900">+</button>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="totalPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total harga :</label>
                                        <h3 className="text-xl font-bold">{total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h3>
                                        <input type="number" hidden id="totalPrice" readOnly aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={total} required />
                                    </div>
                                    <button type="submit" className="w-full mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{load ? 'Loading...' : 'Beli'}</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}