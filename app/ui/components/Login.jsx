"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAuthenticated } from '@/app/lib/services/auth.service';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    
    useEffect(() => {
        if (isAuthenticated()) {
            const user = getCurrentUser();
            console.log('User already authenticated:', user);
            if (user && user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        }
    }, [router]);

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        setLoading(true);
        setErrorData(null);
        setSuccessMessage(null);
        console.log('Login attempt with username:', username, ' password:', password);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password }),
            });

            const data = await response.json();
            console.log('Login response:', data);
            if (response.ok) {
                setSuccessMessage(data.message);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                setTimeout(() => {
                    if (data.user.role === 'admin') {
                        router.push('/admin');
                    } else {
                        router.push('/');
                    }
                }, 1000);
                
            } else {
                setErrorData({ message: data.message || 'Login failed' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorData({ message: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
            {errorData && (
                <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50" role="alert">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Warning alert!</span> {errorData.message}
                    </div>
                </div>
            )}
            
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email atau username</label>
                <input 
                    type="text" 
                    name="username" 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="name@company.com" 
                    required 
                />
            </div>
            
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    required 
                />
            </div>
            
            <div className="flex items-center justify-between">
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
            </div>
            
            <button 
                type="submit" 
                disabled={loading} 
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full disabled:opacity-50"
            >
                {loading ? "Loading..." : "Login"}
            </button>
            
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Belum punya akun? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Daftar</a>
            </p>
        </form>
    );
}