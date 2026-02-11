import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./index";

import "./registry/auth.registry";
import "./registry/album.registry";
import "./registry/track.registry";
import "./registry/artist.registry";
import "./registry/rating.registry";
import "./registry/like.registry";

export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: { title: "API Mongo", version: "1.0.0" },
  });
}