"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function RegisterForm() {
    const router = useRouter()
    const [status, setStatus] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const result = await response.json();
            console.log('Registration successful:', result);
            setStatus(result.message || 'Registration successful');
            router.push('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            setStatus(error.message || 'An error occurred during registration');
        }
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {status && (
                <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Alert!</span> {status}
                    </div>
                </div>
            )}
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" name="email" id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required/>
            </div>
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input type="text" name="username" id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required/>
            </div>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                <input type="text" name="name" id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required/>
            </div>
            <div>
                <label htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" name="password" id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required/>
            </div>
            <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full">Buat Akun</button>
            <p className="text-sm text-center font-light text-gray-500 ">
                sudah punya akun? 
                <Link href="/login" className="font-medium text-primary-600 hover:underline"> Login</Link>
            </p>
        </form>
    )
}