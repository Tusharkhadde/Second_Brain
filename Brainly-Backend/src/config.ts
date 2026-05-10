import dotenv from "dotenv";
dotenv.config();

export const JWT_PASSWORD = process.env.JWT_SECRET || "second_brain_jwt_secret_key_2024";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
