import mongoose from "mongoose";
import { env } from "../../configs/env";

const MONGO_URL = env.MONGO_URI

export async function connectMongo() {
    try {
        await mongoose.connect(MONGO_URL, {
            autoIndex: true,
            serverSelectionTimeoutMS: 5000,
        })

        console.log("MongoDB connected")
    } catch (error: any) {
        console.log("MongoDB connection error", error.message)
    }

    mongoose.connection.on("error", (error: any) => {
        console.log("MongoDB connection error", error.message)
    })

    mongoose.connection.on("disconnected", async () => {
        console.log("MongoDB disconnected")
        await connectWithRetry()
    })
}

async function connectWithRetry() {
    try {
        await mongoose.connect(MONGO_URL, {
            autoIndex: true,
            serverSelectionTimeoutMS: 5000,
        })

        console.log("MongoDB initial connection established")
    } catch (err: any) {
        console.log("MongoDB connection failed. Retrying in 5 seconds...")
        setTimeout(connectWithRetry, 5000)
    }
}

export { mongoose }
