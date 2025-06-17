import Layout from "@/app/ui/components/Layout"
import CreateProduct from "@/app/ui/admin/CreateProduct"
import { getCategories } from "@/app/lib/data/katalog"

export default async function Page() {
    const katalog = await getCategories();
    return (
        <Layout>
            <CreateProduct katalog={katalog}/>
        </Layout>
    )
}