'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { TransactionSkeleton } from '../components/HistorisSkeleton';
import { v4 as uuid } from 'uuid';
import Pagination from '@/app/ui/components/Pagination';

export default function History(props) {
    const { products } = props;
    const router = useRouter();
    const searchParams = useSearchParams();

    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [productSelected, setProductSelected] = useState([]);
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
      const fetchTransactions = async () => {
        try {
            const res = await fetch(`/api/transaksi?page=${page}&limit=${limit}`);
            const transactionsData = await res.json();
            if (transactionsData.status == 200) {
              setTransactions(transactionsData.data);
              setTotal(transactionsData.total);
              setFilteredTransactions(transactionsData.data);
              console.log("Data transaksi berhasil diambil:", transactionsData.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data transaksi:", error);
        } finally {
            setLoading(false);
        }
      };

        fetchTransactions();
    }, [page]);

    useEffect(() => {
      const filtered = transactions.filter(transaction =>
        transaction.productname?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }, [searchTerm, transactions]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newTransaction = {
        id: uuid(),
        trxid: formData.get('trxid') || `#TRX-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '')}`,
        date: formData.get('date'),
        customername: formData.get('customername'),
        item: productSelected.id,
        qty: formData.get('qty'),
        amount: amount,
        status: formData.get('status') || 'Pending'
      };
      
      const response = await fetch('/api/transaksi', {
        method: 'POST',
        body: JSON.stringify(newTransaction),
      });
      
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Gagal menambahkan transaksi. Silakan coba lagi.');
      }
    }

    const handleToSelectProduct = (e) => {
      const selectedProductId = e.target.value;
      const selectedProduct = products.find(product => product.id === selectedProductId);
      setProductSelected(selectedProduct);
    };

    const handleAmountChange = (e) => {
      const qty = e.target.value;
      if (productSelected && productSelected.price) {
        const totalAmount = qty * productSelected.price;
        setAmount(totalAmount);
      } else {
        setAmount(0);
      }
    }

    const handleToDelete = async (id) => {
      if (confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
        try {
          const response = await fetch("/api/transaksi?id=" + id, {
            method: 'DELETE',
          });

          if (response.status === 200) {
            alert("Transaksi berhasil dihapus");
            window.location.reload();
          } else {
            alert("Gagal menghapus transaksi : ", response.message);
          }
        } catch (error) {
          console.error("Error deleting transaction:", error);
          alert("Terjadi kesalahan saat menghapus transaksi");
        }
      }
    }

    return (
        <div className="">
        <Link href="/admin" className="italic text-blue-500">&#x21d0; Kembali</Link>
        {/* Header dengan tombol tambah */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Transaksi Terbaru</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {showForm ? 'Batal' : 'Tambah Transaksi'}
          </button>
        </div>

      {/* Form Tambah Transaksi */}
      {showForm && (
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Tambah Transaksi</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Transaksi</label>
              <input
                type="text"
                name="trxid"
                placeholder="Otomatis jika kosong"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
              <input
                type="date"
                name="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Customer *</label>
              <input
                type="text"
                name="customername"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk *</label>
              {/* <input
                type="text"
                name="productname"
                value={newTransaction.productname}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}
              <select id="product" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                name="product"
                onChange={handleToSelectProduct}
              >
                { products.map((products) => (
                  <option value={products.id} key={products.id}>{products.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah *</label>
              <input
                type="number"
                name="qty"
                onChange={handleAmountChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount *</label>
              <input
                type="number"
                name="amount"
                required
                readOnly
                value={amount}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
            <div className="col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Simpan Transaksi
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

        {/* Search Bar */}
        <div className="mb-4">
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
              Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi
            </p>
          )}
        </div>

        {loading ? (
          <TransactionSkeleton />
        ): (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                { filteredTransactions && filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.trxid}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: '2-digit',   
                                year: 'numeric'
                            })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.name ?? transaction.customername}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.productname}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.qty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${transaction.status==='Selesai' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {transaction.status}
                        </span>
                        </td>
                        <td>
                          <button
                              className="ml-4 font-medium text-red-600 hover:underline"
                              onClick={() => handleToDelete(transaction.id)}
                          >
                              Hapus
                          </button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
        ) }

        {/* PAGINATION UI */}
        <Pagination path="admin/histori" page={page} totalPages={totalPages} />
      </div>
    )
}