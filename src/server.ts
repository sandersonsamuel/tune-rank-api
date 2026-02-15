import { app } from "./app";
import { connectMongo } from "./shared/database/mongoose";
import { env } from "process";
import { startCronJobs } from "./shared/jobs";

const port = env.PORT
const url = `http://localhost:${port}`

async function bootstrap() {
    await connectMongo();

    startCronJobs()

    app.listen(port, () => {
        console.log(`Server is running \n${url}/docs`);
    });
}

bootstrap();
