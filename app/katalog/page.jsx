import Layout from "@/app/ui/components/Layout";
import { getProducts } from "@/app/lib/data/product";
import Katalog from "@/app/ui/customer/Katalog";
import { katalogProduct } from '@/app/lib/data/katalog';
import { Suspense } from "react";

export default async function Page({ searchParams }) {
	const products = await getProducts();
	const { kategori } = await searchParams;

	return (
		<Layout>
			<Suspense fallback={<div>Loading...</div>}>
				<Katalog products={products} katalog={katalogProduct} kategori={kategori}/>
			</Suspense>
		</Layout>
	)
}