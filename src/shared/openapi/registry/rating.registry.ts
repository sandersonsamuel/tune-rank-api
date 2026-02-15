import { CreateRatingDto, GetRatingsByUserIdDto, RatingSchema, RatingTypeSchema } from "../../../modules/rating/rating.schema";
import { errorSchema } from "../../../schemas/errors/error.zod.schema";
import { validationErrorSchema } from "../../../schemas/errors/validation-error.zod.schema";
import { StatusCodes } from "http-status-codes";
import z from "zod/v4";
import { registry } from "..";

registry.register("RatingType", RatingTypeSchema);
registry.register("CreateRatingDto", CreateRatingDto);
registry.register("Rating", RatingSchema);

registry.registerPath({
    method: "post",
    path: "/rating/create",
    tags: ["Rating"],
    summary: "Criar uma avaliação",
    description: "Cria uma nova avaliação para um álbum ou faixa. Cada usuário pode avaliar um release apenas uma vez",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateRatingDto,
                },
            },
        },
    },
    responses: {
        [StatusCodes.CREATED]: {
            description: "Avaliação criada com sucesso",
            content: {
                "application/json": {
                    schema: RatingSchema,
                },
            },
        },
        [StatusCodes.BAD_REQUEST]: {
            description: "Dados de requisição inválidos",
            content: {
                "application/json": {
                    schema: validationErrorSchema,
                },
            },
        },
        [StatusCodes.UNAUTHORIZED]: {
            description: "Não autenticado - Token inválido ou expirado",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
        [StatusCodes.NOT_FOUND]: {
            description: "Usuário ou release (álbum/faixa) não encontrado",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
        [StatusCodes.CONFLICT]: {
            description: "Você já avaliou este release",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
            description: "Erro interno do servidor",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/rating/user",
    tags: ["Rating"],
    summary: "Buscar avaliações por usuário",
    description: "Retorna todas as avaliações de um usuário, agrupadas por álbuns e faixas, com os dados do Spotify incluídos",
    request: {
        query: GetRatingsByUserIdDto
    },
    responses: {
        [StatusCodes.OK]: {
            description: "Avaliações retornadas com sucesso",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            albums: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        userId: { type: "string" },
                                        releaseId: { type: "string" },
                                        review: { type: "string" },
                                        type: { type: "string", enum: ["ALBUM", "TRACK"] },
                                        rating: { type: "number" },
                                        album: { $ref: "#/components/schemas/SpotifyAlbum" }
                                    }
                                }
                            },
                            tracks: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        userId: { type: "string" },
                                        releaseId: { type: "string" },
                                        review: { type: "string" },
                                        type: { type: "string", enum: ["ALBUM", "TRACK"] },
                                        rating: { type: "number" },
                                        track: { $ref: "#/components/schemas/SpotifyTrack" }
                                    }
                                }
                            }
                        }
                    }
                },
            },
        },
        [StatusCodes.UNAUTHORIZED]: {
            description: "Não autenticado - Token inválido ou expirado",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
        [StatusCodes.NOT_FOUND]: {
            description: "Usuário não encontrado",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
            description: "Erro interno do servidor",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/rating/release/{id}",
    tags: ["Rating"],
    summary: "Buscar avaliação por release",
    description: "Retorna a avaliação do usuário autenticado para um release específico (álbum ou faixa)",
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID do release (álbum ou faixa)", example: "4aawyAB9vmqN3uQ7FjRGTy" })
        })
    },
    responses: {
        [StatusCodes.OK]: {
            description: "Avaliação encontrada com sucesso",
            content: {
                "application/json": {
                    schema: RatingSchema,
                },
            },
        },
        [StatusCodes.UNAUTHORIZED]: {
            description: "Não autenticado - Token inválido ou expirado",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
        [StatusCodes.NOT_FOUND]: {
            description: "Avaliação não encontrada para este release",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
            description: "Erro interno do servidor",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
    },
});
