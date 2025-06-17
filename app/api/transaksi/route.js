import { NextRequest, NextResponse } from 'next/server';
import { addTransactionAdmin, deleteTransaction, getTransactions } from '@/app/lib/data/transaksi';

export async function POST(req) {
    try {
        const data = await req.json();
        const insert = await addTransactionAdmin(data);
        if(insert) {
            return Response.json({
            status: 200,
            message: 'Data received successfully',
            data: data
            }, { status: 200 });
        } else { 
            throw new Error('Failed to insert data');
        }
    } catch (error) {
        console.error('Error in POST /transaksi:', error);
        return NextResponse.json({
            status: 500,
            message: 'Failed to add transaction',
            error: error.message
        }, { status: 500 });
    };   
}

export async function DELETE(req) {
    try {
        const url = new URL(req.url).searchParams;
        const id = String(url.get("id"));

        if (!id) {
            return NextResponse.json({
                message: 'id transaksi tidak valid',
            }, { status: 400 });
        }

        const response = await deleteTransaction(id);

        if (response) {
            return NextResponse.json({
                status: 200,
                message: 'transaksi berhasil dihapus',
            }, { status: 200 });
        } else {
            return NextResponse.json({
                status: 500,
                message: 'Gagal menghapus transaksi',
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Error deleting history:', error);
        return NextResponse.json({
            message: 'Gagal menghapus transaksi',
        }, { status: 500 });
    };
    
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;

        const start = (page - 1) * limit;
        const end = start + limit; 
        
        const transaksi = await getTransactions();
        
        const paginatedTransaksi = transaksi.slice(start, end);
        console.log('Paginated Transaksi:', paginatedTransaksi);

        return NextResponse.json({
            status: 200,
            message: 'Data retrieved successfully',
            data: paginatedTransaksi,
            total: transaksi.length,
            page: page,
            limit: limit
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'Failed to retrieve transactions',
            error: error.message
        }, { status: 500 });
    };
}