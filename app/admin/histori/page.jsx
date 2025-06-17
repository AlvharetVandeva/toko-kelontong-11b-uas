import Layout from "@/app/ui/components/Layout";
import { getProducts } from "@/app/lib/data/product";
import History from "@/app/ui/admin/History";
import { Suspense } from "react";

export default async function Page() {
    const products = await getProducts();
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <History products={products}></History>
            </Suspense>
        </Layout>
    )
}