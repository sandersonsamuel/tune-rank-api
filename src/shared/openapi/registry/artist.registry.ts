import { z } from "zod";
import { errorSchema } from "@/schemas/errors/error.zod.schema";
import { validationErrorSchema } from "@/schemas/errors/validation-error.zod.schema";
import { SpotifyArtistSchema } from "@/modules/artist/artist.schema";
import { registry } from "..";

registry.register("SpotifyArtist", SpotifyArtistSchema);

registry.registerPath({
    method: "get",
    path: "/artist/{id}",
    summary: "Buscar artista por ID",
    description: "Busca um artista do Spotify pelo seu ID",
    tags: ["Artist"],
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID do artista no Spotify", example: "4Z8W4fKeB5YxbusRsdQVPb" })
        })
    },
    responses: {
        200: {
            description: "Artista encontrado com sucesso",
            content: {
                "application/json": {
                    schema: SpotifyArtistSchema,
                },
            },
        },
        400: {
            description: "Parâmetro inválido",
            content: {
                "application/json": {
                    schema: validationErrorSchema
                },
            },
        },
        401: {
            description: "Não autenticado - Token inválido ou expirado",
            content: {
                "application/json": {
                    schema: errorSchema
                },
            },
        },
        404: {
            description: "Artista não encontrado",
            content: {
                "application/json": {
                    schema: errorSchema
                },
            },
        },
        500: {
            description: "Erro interno do servidor ou falha na API do Spotify",
            content: {
                "application/json": {
                    schema: errorSchema
                },
            },
        },
    },
});