import { errorSchema } from "@/schemas/errors/error.zod.schema";
import { registry } from "..";
import { validationErrorSchema } from "@/schemas/errors/validation-error.zod.schema";
import { SpotifyArtistSchema } from "@/modules/artist/artist.schema";

registry.registerPath({
    method: "get",
    path: "/artist/{id}",
    tags: ["Artist"],
    summary: "Get artist by ID",
    description: "Get artist by ID",
    parameters: [
        {
            name: "id",
            in: "path",
            required: true,
            schema: {
                type: "string",
            },
        },
    ],
    responses: {
        200: {
            description: "Artist found",
            content: {
                "application/json": {
                    schema: SpotifyArtistSchema,
                },
            },
        },
        400: {
            description: "Invalid request",
            content: {
                "application/json": {
                    schema: validationErrorSchema
                },
            },
        },
        404: {
            description: "Artist not found",
            content: {
                "application/json": {
                    schema: errorSchema
                },
            },
        },
    },
});