"use client";
import React from 'react';

export function ProductsSkeletonLoader() {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nama Produk
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Katalog
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Stok
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Harga
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array(5).fill(0).map((_, index) => (
                        <tr key={`skeleton-${index}`} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
                            </th>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded-md w-12 animate-pulse"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-4">
                                    <div className="h-4 bg-blue-200 rounded-md dark:bg-blue-700 w-10 animate-pulse"></div>
                                    <div className="h-4 bg-red-200 rounded-md dark:bg-red-700 w-14 animate-pulse"></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}