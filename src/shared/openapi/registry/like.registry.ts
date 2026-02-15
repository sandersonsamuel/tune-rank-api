import { z } from "zod";
import { CreateLikeDto } from "../../../modules/like/like.dto";
import { LikeSchema } from "../../../modules/like/like.schema";
import { errorSchema } from "../../../schemas/errors/error.zod.schema";
import { validationErrorSchema } from "../../../schemas/errors/validation-error.zod.schema";
import { StatusCodes } from "http-status-codes";
import { registry } from "..";

registry.register("CreateLikeDto", CreateLikeDto);
registry.register("Like", LikeSchema);

registry.registerPath({
    method: "post",
    path: "/like",
    tags: ["Like"],
    summary: "Curtir uma faixa",
    description: "Cria um like para uma faixa. A faixa deve existir no Spotify",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateLikeDto,
                },
            },
        },
    },
    responses: {
        [StatusCodes.CREATED]: {
            description: "Like criado com sucesso",
            content: {
                "application/json": {
                    schema: LikeSchema,
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
            description: "Faixa não encontrada no Spotify",
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
    method: "delete",
    path: "/like/{id}",
    tags: ["Like"],
    summary: "Remover um like",
    description: "Remove o like de uma faixa pelo ID do release",
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID do release para descurtir", example: "4aawyAB9vmqN3uQ7FjRGTy" })
        })
    },
    responses: {
        [StatusCodes.NO_CONTENT]: {
            description: "Like removido com sucesso",
        },
        [StatusCodes.UNAUTHORIZED]: {
            description: "Não autenticado - Token inválido ou expirado",
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
