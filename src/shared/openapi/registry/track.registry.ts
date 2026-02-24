import { z } from "zod";
import { registry } from "..";
import { errorSchema } from "../../../schemas/errors/error.zod.schema";
import { validationErrorSchema } from "../../../schemas/errors/validation-error.zod.schema";
import { TrackSchema } from "../../../modules/track/track.schema";

registry.register("Track", TrackSchema);

registry.registerPath({
    method: "get",
    path: "/track/{id}",
    summary: "Buscar faixa por ID",
    description: "Busca uma faixa do Spotify pelo seu ID",
    tags: ["Track"],
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID da faixa no Spotify", example: "11dFghVXANMlKmJXsNCbNl" })
        })
    },
    responses: {
        200: {
            description: "Faixa encontrada com sucesso",
            content: {
                "application/json": {
                    schema: TrackSchema
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
            description: "Faixa não encontrada",
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
    path: "/track",
    summary: "Buscar múltiplas faixas por IDs",
    description: "Busca múltiplas faixas do Spotify a partir de IDs separados por vírgula",
    tags: ["Track"],
    request: {
        query: z.object({
            ids: z.string().openapi({ description: "IDs das faixas separados por vírgula", example: "11dFghVXANMlKmJXsNCbNl,3n3Ppam7vgaVa1iaRUc9Lp" })
        })
    },
    responses: {
        200: {
            description: "Faixas encontradas com sucesso",
            content: {
                "application/json": {
                    schema: z.array(TrackSchema)
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
            description: "Nenhuma faixa encontrada",
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
