"use client";

import React from 'react';

// Skeleton untuk informasi pengguna
export const UserInfoSkeleton = () => {
  return (
    <div className="mb-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="h-5 w-5 bg-blue-200 rounded animate-pulse"></div>
          </div>
          <div className="ml-3">
            <div className="h-4 w-48 bg-blue-100 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton untuk card summary
export const SummaryCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gray-100 rounded-md p-3">
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="ml-5">
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="mt-1 h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-4 w-28 bg-blue-100 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Skeleton untuk judul tabel
export const TableTitleSkeleton = () => {
  return (
    <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
  );
};

// Skeleton untuk header tabel
export const TableHeaderSkeleton = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {['ID', 'Tanggal', 'Customer', 'Total', 'Status'].map((header) => (
          <th key={header} className="px-6 py-3 text-left">
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

// Komponen Dashboard full skeleton
export const DashboardFullSkeleton = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <UserInfoSkeleton />
          <SummaryCardSkeleton />
          <div className="mt-8">
            <TableTitleSkeleton />
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHeaderSkeleton />
                <tbody>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TableSkeleton() {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                    <td className="px-6 py-4">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                    </td>
                </tr>
            ))}
        </tbody>
        
    );
}