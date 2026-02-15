import { CreateUserDto, LoginUserDto } from "../../../modules/user/user.dto";
import { registry } from "..";
import { validationErrorSchema } from "../../../schemas/errors/validation-error.zod.schema";
import { errorSchema } from "../../../schemas/errors/error.zod.schema";
import { successSchema } from "../../../schemas/success";

registry.register("CreateUserDto", CreateUserDto);
registry.register("LoginUserDto", LoginUserDto);

registry.registerPath({
    method: "post",
    path: "/auth/register",
    summary: "Registrar novo usuário",
    description: "Cria uma nova conta de usuário no sistema",
    tags: ["Auth"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateUserDto
                }
            }
        }
    },
    responses: {
        201: {
            description: "Usuário registrado com sucesso",
            content: {
                "application/json": {
                    schema: CreateUserDto
                }
            }
        },
        400: {
            description: "Dados inválidos ou usuário já existe",
            content: {
                "application/json": {
                    schema: validationErrorSchema
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
        },
    }
});

registry.registerPath({
    method: "post",
    path: "/auth/login",
    summary: "Fazer login",
    description: "Autentica o usuário e retorna cookies com tokens de acesso e refresh",
    tags: ["Auth"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: LoginUserDto
                }
            }
        }
    },
    responses: {
        200: {
            description: "Login realizado com sucesso - Cookies definidos com accessToken e refreshToken",
            content: {
                "application/json": {
                    schema: successSchema
                }
            }
        },
        400: {
            description: "Senha inválida ou dados de requisição inválidos",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
        404: {
            description: "Usuário não encontrado",
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
        },
    }
});

registry.registerPath({
    method: "post",
    path: "/auth/logout",
    summary: "Fazer logout",
    description: "Encerra a sessão do usuário e remove os cookies de autenticação",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Logout realizado com sucesso",
            content: {
                "application/json": {
                    schema: successSchema
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
        },
    }
});

registry.registerPath({
    method: "post",
    path: "/auth/refresh",
    summary: "Renovar token de acesso",
    description: "Gera um novo accessToken a partir do refreshToken armazenado nos cookies",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Token renovado com sucesso - Novo cookie accessToken definido",
            content: {
                "application/json": {
                    schema: successSchema
                }
            }
        },
        401: {
            description: "Não autenticado - Token inválido, expirado ou sessão não pertence ao usuário",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
        404: {
            description: "Sessão não encontrada",
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
        },
    }
});

registry.registerPath({
    method: "get",
    path: "/auth/me",
    summary: "Obter usuário autenticado",
    description: "Retorna os dados do usuário autenticado a partir do token de acesso",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Dados do usuário retornados com sucesso",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            email: { type: "string" },
                            createdAt: { type: "string" },
                            updatedAt: { type: "string" },
                        }
                    }
                }
            }
        },
        400: {
            description: "Usuário não encontrado",
            content: {
                "application/json": {
                    schema: errorSchema
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
        },
    }
});
