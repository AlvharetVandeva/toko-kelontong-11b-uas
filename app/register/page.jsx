import Layout from "../ui/components/Layout";
import RegisterForm from "@/app/ui/components/RegisterForm";

export default function Page() {

    return (
        <Layout>
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadowmd:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Buat Akun Anda
                            </h1>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
        
    );
}