import express from "express";
import "./configs/env";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";
import { handleInvalidJson } from "./shared/middlewares/handle-invalid-json.middleware";
import cookieParser from "cookie-parser";
import { env } from "./configs/env";
import { registerDependencies } from "./shared/container/register";
import cors from "cors";
import { generateOpenApiDocument } from "./shared/openapi/generator";

registerDependencies();

const { router } = require("./routes");

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

app.use('/docs', async (req, res) => {
  const { apiReference } = await import('@scalar/express-api-reference');
  const middleware = apiReference({
    url: '/openapi.json',
  });
  return middleware(req, res);
});

app.use(router);
app.use(errorHandler);

export { app };