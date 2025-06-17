import postgres from 'postgres';
import { unstable_noStore as noStore } from 'next/cache';
const sql = postgres(process.env.POSTGRES_URL, { ssl : "require" })

export const katalogProduct = [
  {
    "id": 1,    
    "nama": "Sembako"
  }, 
  {
    "id": 2,
    "nama": "Makanan Ringan"
  }, 
  {
    "id": 3,
    "nama": "Minuman"
  }, 
  {
    "id": 4,
    "nama": "Peralaatan Mandi"
  }, 
  {
    "id": 5,
    "nama": "Bumbu Dapur"
  }, 
  {
    "id": 6,
    "nama": "Alat Tulis"
  }, 
]

export async function getCategories() {
  noStore(); 
  try {
    const categories = await sql`
      SELECT *
      FROM categories 
    `;
    return categories;
  } catch (error) { 
      console.log(error);
  };
}