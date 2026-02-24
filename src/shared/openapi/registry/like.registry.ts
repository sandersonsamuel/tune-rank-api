import { z } from "zod";
import { CreateLikeDto } from "../../../modules/like/like.dto";
import { LikeSchema } from "../../../modules/like/like.schema";
import { errorSchema } from "../../../schemas/errors/error.zod.schema";
import { validationErrorSchema } from "../../../schemas/errors/validation-error.zod.schema";
import { StatusCodes } from "http-status-codes";
import { registry } from "..";
import { AlbumSchema } from "../../../modules/album/album.schema";
import { TrackSchema } from "../../../modules/track/track.schema";

registry.register("CreateLikeDto", CreateLikeDto);
registry.register("Like", LikeSchema);

registry.registerPath({
    method: "get",
    path: "/like/{id}",
    tags: ["Like"],
    summary: "Obter like do usuário",
    description: "Obtém o like do usuário logado",
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID do release", example: "4aawyAB9vmqN3uQ7FjRGTy" })
        })
    },
    responses: {
        [StatusCodes.OK]: {
            description: "Like do usuário obtido com sucesso",
            content: {
                "application/json": {
                    schema: LikeSchema,
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
    path: "/like/user",
    tags: ["Like"],
    summary: "Obter likes do usuário",
    description: "Obtém os likes do usuário logado",
    responses: {
        [StatusCodes.OK]: {
            description: "Likes do usuário obtidos com sucesso",
            content: {
                "application/json": {
                    schema: z.object({
                        tracks: z.array(TrackSchema),
                        albums: z.array(AlbumSchema),
                    }),
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
    method: "post",
    path: "/like",
    tags: ["Like"],
    summary: "Curtir uma faixa ou álbum",
    description: "Cria um like para uma faixa ou álbum. A faixa ou álbum deve existir no Spotify",
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
