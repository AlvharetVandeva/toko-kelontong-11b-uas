import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/app/lib/data/user';

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, email, password, name } = body;

        // Validasi input
        if (!username || !email || !password || !name) {
            return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
        }

        // Panggil fungsi register
        const user = await register({ username, email, password, name });

        return NextResponse.json({ message: 'Registrasi berhasil', user }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}