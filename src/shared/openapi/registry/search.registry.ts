import { z } from "zod";
import { registry } from "..";
import { errorSchema } from "@/schemas/errors/error.zod.schema";
import { validationErrorSchema } from "@/schemas/errors/validation-error.zod.schema";

registry.registerPath({
    method: "get",
    path: "/search",
    summary: "Buscar no Spotify",
    description: "Realiza uma busca no Spotify por álbuns, faixas e artistas",
    tags: ["Search"],
    request: {
        query: z.object({
            q: z.string().min(1).max(100).openapi({ description: "Termo de busca", example: "Radiohead" })
        })
    },
    responses: {
        200: {
            description: "Resultados da busca retornados com sucesso",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            albums: {
                                $ref: "#/components/schemas/SpotifyAlbumSearchResponse"
                            },
                            artists: {
                                $ref: "#/components/schemas/SpotifyArtistSearchResponse"
                            },
                            tracks: {
                                $ref: "#/components/schemas/SpotifyTrackSearchResponse"
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: "Query inválida - parâmetro 'q' ausente ou fora do tamanho permitido",
            content: {
                "application/json": {
                    schema: validationErrorSchema
                }
            }
        },
        401: {
            description: "Não autenticado - Token inválido ou expirado",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
        500: {
            description: "Erro interno do servidor ou falha na API do Spotify",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        }
    }
});
