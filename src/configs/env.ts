import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    MONGO_URI: z.string().min(1),
    PORT: z.string().default("3000").transform((port) => parseInt(port)),
    JWT_SECRET: z.string().min(1),
    COOKIE_SECRET: z.string().min(1),
})

export const env = {
    MONGO_URI: envSchema.parse(process.env).MONGO_URI,
    PORT: envSchema.parse(process.env).PORT,
    JWT_SECRET: envSchema.parse(process.env).JWT_SECRET,
    COOKIE_SECRET: envSchema.parse(process.env).COOKIE_SECRET,
}
console.log("\nLoaded env:", env)
console.log("\n")
