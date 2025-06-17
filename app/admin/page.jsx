import Layout from "@/app/ui/components/Layout";
import Dashboard from "@/app/ui/admin/Dashboard";
import { getProducts } from "@/app/lib/data/product";
import { getTransactions } from "@/app/lib/data/transaksi";

export default async function Page() {
    const products = await getProducts();
    const transaksi = await getTransactions();
    console.log('Products:', products);
    console.log('Transactions:', transaksi);
    return (
        <Layout>
            <Dashboard products={products} transaksi={transaksi}/>
        </Layout>
    )
}