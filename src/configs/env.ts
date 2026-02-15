import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    MONGO_URI: z.string().min(1),
    PORT: z.string().default("3000").transform((port) => parseInt(port)),
    JWT_SECRET: z.string().min(1),
    COOKIE_SECRET: z.string().min(1),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_BASE_URL: z.string().default("https://api.spotify.com/v1"),
    SPOTIFY_AUTH_URL: z.string().default("https://accounts.spotify.com/api/token"),
})

export const env = {
    MONGO_URI: envSchema.parse(process.env).MONGO_URI,
    PORT: envSchema.parse(process.env).PORT,
    JWT_SECRET: envSchema.parse(process.env).JWT_SECRET,
    COOKIE_SECRET: envSchema.parse(process.env).COOKIE_SECRET,
    SPOTIFY_CLIENT_ID: envSchema.parse(process.env).SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: envSchema.parse(process.env).SPOTIFY_CLIENT_SECRET,
    SPOTIFY_BASE_URL: envSchema.parse(process.env).SPOTIFY_BASE_URL,
    SPOTIFY_AUTH_URL: envSchema.parse(process.env).SPOTIFY_AUTH_URL,
}
console.log("\nLoaded envs ✅")
console.log("\n")
