import Layout from "@/app/ui/components/Layout"
import { getProductById } from "@/app/lib/data/product"
import DetailProduct from "@/app/ui/customer/DetailProduct"

export default async function Page({params}) {
    const { id } = await params
    const product = await getProductById(id)
    return (
        <Layout>
            <DetailProduct product={product} />
        </Layout>
    )
}