import postgres from 'postgres';
import { unstable_noStore as noStore } from 'next/cache';
const sql = postgres(process.env.POSTGRES_URL, { ssl : "require" })

export async function getProducts() {
    noStore(); 
    try {
        const products = await sql`
            SELECT 
                products.id, 
                products.name, 
                products.price, 
                products.stock, 
                products.image, 
                products."categoryId", 
                categories.name as category 
            FROM products 
            INNER JOIN categories 
            ON products."categoryId" = categories.id
        `;
        return products;
    } catch (error) {
        console.log(error);
    };
}

export async function addProduct(req) {
    try {
        const { id, product, category, stock, price, imageUrl } = req.body;
    
        const insert = await sql`
            INSERT INTO products (id, name, price, stock, image, "categoryId")
            VALUES (${id}, ${product}, ${price}, ${stock}, ${imageUrl}, ${category})
        `;

        return insert.count > 0;
    } catch (error) {
        console.error('Database error:', error);
        return false;
    }
}

export async function deleteProduct(id) {
    try {
        const del = await sql`DELETE FROM products WHERE id = ${id}`;
        return del.count > 0;
    } catch (error) {
        console.error('Database error:', error);
        return false;
    }
}

export async function getProductById(id) {
    noStore();
    try {
        const product = await sql`
        SELECT 
            products.id, 
            products.name, 
            products.price, 
            products.stock, 
            products.image, 
            products."categoryId" as category_id, 
            products.description,
            categories.name as category 
        FROM products 
        INNER JOIN categories 
        ON products."categoryId" = categories.id
        WHERE products.id = ${id}`;
        return product[0];
    } catch (error) {
        console.log(error);
    };
}

export async function updateProduct(req) {
    try {
        const { id, product, category, stock, price, imageUrl } = req.body;
        const update = await sql`
          UPDATE products
          SET name = ${product}, price = ${price}, stock = ${stock}, "categoryId" = ${category}, image = ${imageUrl}
          WHERE id = ${id}
        `;
        return update.count > 0;
    } catch (error) {
        console.error('Database error:', error);
        console.log(error);
    };
    
}