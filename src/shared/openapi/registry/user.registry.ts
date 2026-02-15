import { z } from "zod";
import { registry } from "..";
import { errorSchema } from "../../../schemas/errors/error.zod.schema";
import { validationErrorSchema } from "../../../schemas/errors/validation-error.zod.schema";

const UserResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
}).openapi("UserResponse");

registry.register("UserResponse", UserResponseSchema);

registry.registerPath({
    method: "get",
    path: "/user/{id}",
    summary: "Buscar usuário por ID",
    description: "Retorna os dados públicos de um usuário pelo seu ID",
    tags: ["User"],
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID do usuário", example: "507f1f77bcf86cd799439011" })
        })
    },
    responses: {
        200: {
            description: "Usuário encontrado com sucesso",
            content: {
                "application/json": {
                    schema: UserResponseSchema
                }
            }
        },
        400: {
            description: "Parâmetro inválido ou usuário não encontrado",
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
            description: "Erro interno do servidor",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        }
    }
});
