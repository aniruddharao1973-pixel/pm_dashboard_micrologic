// backend/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // <-- VERY IMPORTANT

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
