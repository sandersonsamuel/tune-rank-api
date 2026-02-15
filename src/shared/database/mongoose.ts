import mongoose from "mongoose";
import { env } from "../../configs/env";

const MONGO_URL = env.MONGO_URI

let isConnected = false

export async function connectMongo() {
    if (isConnected) return

    try {
        await mongoose.connect(MONGO_URL, {
            autoIndex: true,
            serverSelectionTimeoutMS: 5000,
        })

        isConnected = true
        console.log("MongoDB connected")
    } catch (error: any) {
        console.log("MongoDB connection error", error.message)
    }

    mongoose.connection.on("error", (error: any) => {
        console.log("MongoDB connection error", error.message)
    })

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected")
        isConnected = false
    })
}

export { mongoose }
