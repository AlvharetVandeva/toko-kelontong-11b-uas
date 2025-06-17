import TrendPenjualan from "@/app/ui/admin/TrendPenjualan";
import Layout from "@/app/ui/components/Layout";
import { getTransactions } from "@/app/lib/data/transaksi";

export default async function Page() {
    const transaksi = await getTransactions();
    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold">Laporan Analitik</h2>
                        <div className="grid grid-flow-col grid-cols gap-4">
                            <div id="tren-penjualan">
                                <div className="bg-white shadow-md rounded-lg p-4">
                                <h3 className="text-xl font-semibold mt-4 text-center">Trend Penjualan</h3>
                                    <TrendPenjualan transaksi={transaksi}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}