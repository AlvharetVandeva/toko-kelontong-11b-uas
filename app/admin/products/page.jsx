import Layout from "@/app/ui/components/Layout";
import Products from "@/app/ui/admin/Products";
import { Suspense } from "react";

export default async function Page() {
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Products/>
            </Suspense>
        </Layout>
    )
}