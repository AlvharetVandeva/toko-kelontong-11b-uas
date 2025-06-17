import Layout from "@/app/ui/components/Layout";
import { getProductById } from "@/app/lib/data/product";
import { getCategories } from "@/app/lib/data/katalog"
import EditProduct from "@/app/ui/admin/EditProduct";

export default async function Page({params}) {
    const { id } = await params
    const product = await getProductById(id)
    const katalog = await getCategories();
    return (
        <Layout>
            <EditProduct product={product} katalog={katalog} productId={id}/>
        </Layout>
    )
}