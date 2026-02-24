import { z } from "zod";
import { errorSchema } from "../../../schemas/errors/error.zod.schema";
import { validationErrorSchema } from "../../../schemas/errors/validation-error.zod.schema";
import { ArtistSchema } from "../../../modules/artist/artist.schema";
import { TrackSchema } from "../../../modules/track/track.schema";
import { AlbumSchema } from "../../../modules/album/album.schema";
import { registry } from "..";

registry.register("Artist", ArtistSchema);

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
                    schema: ArtistSchema,
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

registry.registerPath({
    method: "get",
    path: "/artist/{id}/top-tracks",
    summary: "Buscar top tracks de um artista",
    description: "Retorna as faixas mais populares de um artista do Spotify",
    tags: ["Artist"],
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID do artista no Spotify", example: "4Z8W4fKeB5YxbusRsdQVPb" })
        })
    },
    responses: {
        200: {
            description: "Top tracks encontradas com sucesso",
            content: {
                "application/json": {
                    schema: z.array(TrackSchema),
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
            description: "Top tracks do artista não encontradas",
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

registry.registerPath({
    method: "get",
    path: "/artist/{id}/albums",
    summary: "Buscar álbuns de um artista",
    description: "Retorna os álbuns de um artista do Spotify",
    tags: ["Artist"],
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID do artista no Spotify", example: "4Z8W4fKeB5YxbusRsdQVPb" })
        })
    },
    responses: {
        200: {
            description: "Álbuns encontrados com sucesso",
            content: {
                "application/json": {
                    schema: z.array(AlbumSchema),
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
            description: "Álbuns do artista não encontrados",
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