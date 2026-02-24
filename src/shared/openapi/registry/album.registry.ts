import { z } from "zod";
import { registry } from "..";
import { errorSchema } from "../../../schemas/errors/error.zod.schema";
import { validationErrorSchema } from "../../../schemas/errors/validation-error.zod.schema";
import { AlbumSchema } from "../../../modules/album/album.schema";

registry.register("Album", AlbumSchema);

registry.registerPath({
    method: "get",
    path: "/album/{id}",
    summary: "Buscar álbum por ID",
    description: "Busca um álbum do Spotify pelo seu ID",
    tags: ["Album"],
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID do álbum no Spotify", example: "4aawyAB9vmqN3uQ7FjRGTy" })
        })
    },
    responses: {
        200: {
            description: "Álbum encontrado com sucesso",
            content: {
                "application/json": {
                    schema: AlbumSchema
                }
            }
        },
        400: {
            description: "Parâmetro inválido",
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
        404: {
            description: "Álbum não encontrado",
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

registry.registerPath({
    method: "get",
    path: "/album",
    summary: "Buscar múltiplos álbuns por IDs",
    description: "Busca múltiplos álbuns do Spotify a partir de uma lista de IDs",
    tags: ["Album"],
    request: {
        query: z.object({
            ids: z.array(z.string()).openapi({ description: "Lista de IDs dos álbuns no Spotify", example: ["4aawyAB9vmqN3uQ7FjRGTy", "2noRn2Aes5aoNVsU6iWThc"] })
        })
    },
    responses: {
        200: {
            description: "Álbuns encontrados com sucesso",
            content: {
                "application/json": {
                    schema: z.array(AlbumSchema)
                }
            }
        },
        400: {
            description: "Query inválida - IDs ausentes ou mal formatados",
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
        404: {
            description: "Nenhum álbum encontrado",
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
