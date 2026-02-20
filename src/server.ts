import { env } from "./configs/env";
import { app } from "./app";
import { connectMongo } from "./shared/database/mongoose";

async function bootstrap() {
    await connectMongo();

    app.listen(env.PORT, () => {
        console.log(`Server is running on port ${env.PORT}`);
    });
}

bootstrap();
