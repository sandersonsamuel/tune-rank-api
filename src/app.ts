import express from "express";
import "./configs/env";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";
import { handleInvalidJson } from "./shared/middlewares/handle-invalid-json.middleware";
import cookieParser from "cookie-parser";
import { env } from "./configs/env";
import { registerDependencies } from "./shared/container/register";
import cors from "cors";
import { generateOpenApiDocument } from "./shared/openapi/generator";
import { apiReference } from '@scalar/express-api-reference';

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(handleInvalidJson);
app.use(cookieParser(env.COOKIE_SECRET));

app.get('/openapi.json', (_req, res) => {
  res.json(generateOpenApiDocument());
});

app.use(
  '/docs',
  apiReference({
    url: '/openapi.json',
    title: 'API Mongo',
  })
);

async function setupRoutes() {
  registerDependencies();

  const { router } = await import("./routes.js");
  app.use(router);
  app.use(errorHandler);
}

setupRoutes();

export { app };