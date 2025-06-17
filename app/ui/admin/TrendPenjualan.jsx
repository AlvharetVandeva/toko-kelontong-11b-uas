"use client";
import { Line } from 'react-chartjs-2';
import Chart from "chart.js/auto"; // Importing the Chart.js library
import { useEffect, useState } from 'react';
import ChartSkeleton from '@/app/ui/components/ChartSkeleton';

export default function TrendPenjualan(props) {
    const { transaksi } = props;
    const [trx, setTrx] = useState()
    const [loading, setLoading] = useState(true);

    const transactions = async () => {
        try {
            const transactionsData = await transaksi;
            setTrx(transactionsData);
        } catch (error) {
            console.error("Gagal mengambil data transaksi:", error);
        }
    }

    useEffect(() => {
        transactions();
        setLoading(false);
    }, []);

    const data = {
        labels: trx ? trx.map(transaction => String(transaction.date).substring(0, 10)) : [],
        datasets: [
            {
                label: 'Total Penjualan',
                data: trx ? trx.map(transaction => transaction.amount) : [],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    }

    return (
        <>
            {loading ? (
                <ChartSkeleton />
            ) : (
                <Line
                    data={data}
                />
            )}
        </>
    )
}