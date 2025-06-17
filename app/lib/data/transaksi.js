import postgres from 'postgres';
import { unstable_noStore as noStore } from 'next/cache';
const sql = postgres(process.env.POSTGRES_URL, { ssl : "require" })

export async function getTransactions() {
    noStore(); 
    try {
        const transactions = await sql`
            SELECT 
                transactions.id, 
                transactions.trxid, 
                transactions.date, 
                transactions.customer, 
                transactions.customername, 
                transactions.item, 
                transactions.amount,
                transactions.qty,
                transactions.status,
                users.name as name,
                products.name as productname
            FROM transactions 
            LEFT JOIN products 
            ON transactions.item = products.id 
            LEFT JOIN users
            ON transactions.customer = users.id
            ORDER BY transactions.date DESC
        `;
        return transactions;
    } catch (error) {
        console.log(error);
    };
}

export async function addTransactionAdmin(data) { 
    const { id, trxid, date, item, qty, customername, amount, status } = data;
    try {
        const insert = await sql`
            INSERT INTO transactions (id, trxid, date, item, qty, customername, amount, status)
            VALUES (${id}, ${trxid}, ${date}, ${item}, ${qty}, ${customername}, ${amount}, ${status})
        `;
        return insert.count > 0;
    } catch (error) {
        console.log(error);
    };
}

export async function addTransaction(data) { 
    const { id, trxid, date, item, qty, amount, status } = data;
    const customer = data.customer && data.customer.trim() !== '' ? data.customer : null;
    try {
        const insert = await sql`
            INSERT INTO transactions (id, trxid, date, item, qty, customer, amount, status)
            VALUES (${id}, ${trxid}, ${date}, ${item}, ${qty}, ${customer}, ${amount}, ${status})
        `;
        return insert.count > 0;
    } catch (error) {
        console.log(error);
    };
}

export async function deleteTransaction(id) {
    try {
        const del = await sql`
            DELETE FROM transactions 
            WHERE id = ${id}
        `;
        return del.count > 0;
    } catch (error) {
        console.log(error);
    };
    
}