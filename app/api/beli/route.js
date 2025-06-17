import { NextRequest, NextResponse } from 'next/server';
import { addTransaction } from '@/app/lib/data/transaksi';

export async function POST(req) {
    try {
        const data = await req.json();
        console.log('Received data:', data);
        const response = await addTransaction(data);
        if (response) {
            return NextResponse.json({ 
                status : 201,
                message: 'Transaction added successfully',
                data: data
            }, { status: 201 });
        } else {
            return NextResponse.json({ status: 500, message: 'Failed to add transaction' }, { status: 500 });
        }
    } catch (error) {
        console.error('Database error:', error);
    }
}