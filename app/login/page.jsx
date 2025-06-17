import Image from "next/image"
import Layout from "../ui/components/Layout"
import Login from "@/app/ui/components/Login"

export default function Page() {
  return (
		<Layout>
			<section className="bg-gray-50">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
								Login ke Toko Kelontong
							</h1>
							<p className="text-center">Silakan masukkan email dan password Anda</p>
							<Login/>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}