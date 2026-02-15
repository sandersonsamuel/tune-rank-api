import { app, setupPromise } from "../src/app";
import { connectMongo } from "../src/shared/database/mongoose";

let isConnected = false;
let isSetupComplete = false;

async function initializeApp() {
    if (!isConnected) {
        await connectMongo();
        isConnected = true;
    }

    if (!isSetupComplete) {
        await setupPromise;
        isSetupComplete = true;
    }
}

export default async function handler(req: any, res: any) {
    await initializeApp();
    return app(req, res);
}
