import { z } from "zod";
import { CreateUserDto, LoginUserDto, ResendVerificationDto } from "../../../modules/user/user.dto";
import { registry } from "..";
import { validationErrorSchema } from "../../../schemas/errors/validation-error.zod.schema";
import { errorSchema } from "../../../schemas/errors/error.zod.schema";
import { successSchema } from "../../../schemas/success";

registry.register("CreateUserDto", CreateUserDto);
registry.register("LoginUserDto", LoginUserDto);
registry.register("ResendVerificationDto", ResendVerificationDto);

const successWithMessageSchema = z.object({
    success: z.boolean(),
    message: z.string(),
})

const meResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})

// ─── Register ────────────────────────────────────────────────────────────────

registry.registerPath({
    method: "post",
    path: "/auth/register",
    summary: "Registrar novo usuário",
    description: "Cria uma nova conta de usuário. Um email de verificação é enviado automaticamente para o endereço informado.",
    tags: ["Auth"],
    request: {
        body: {
            content: {
                "application/json": { schema: CreateUserDto }
            }
        }
    },
    responses: {
        201: {
            description: "Usuário criado com sucesso. Verificação de email enviada.",
            content: {
                "application/json": { schema: CreateUserDto }
            }
        },
        400: {
            description: "Dados inválidos ou usuário já cadastrado.",
            content: {
                "application/json": { schema: validationErrorSchema }
            }
        },
        500: {
            description: "Erro interno do servidor.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
    }
});

// ─── Login ───────────────────────────────────────────────────────────────────

registry.registerPath({
    method: "post",
    path: "/auth/login",
    summary: "Fazer login",
    description: "Autentica o usuário e define cookies `accessToken` (1 dia) e `refreshToken` (7 dias). O email precisa estar verificado.",
    tags: ["Auth"],
    request: {
        body: {
            content: {
                "application/json": { schema: LoginUserDto }
            }
        }
    },
    responses: {
        200: {
            description: "Login realizado com sucesso.",
            content: {
                "application/json": { schema: successSchema }
            }
        },
        400: {
            description: "Senha inválida ou dados malformados.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        403: {
            description: "Email não verificado. Verifique sua caixa de entrada antes de fazer login.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        404: {
            description: "Usuário não encontrado.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        500: {
            description: "Erro interno do servidor.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
    }
});

// ─── Logout ──────────────────────────────────────────────────────────────────

registry.registerPath({
    method: "post",
    path: "/auth/logout",
    summary: "Fazer logout",
    description: "Encerra a sessão do usuário, remove os cookies e invalida a sessão no banco.",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Logout realizado com sucesso.",
            content: {
                "application/json": { schema: successSchema }
            }
        },
        401: {
            description: "Não autenticado.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        500: {
            description: "Erro interno do servidor.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
    }
});

// ─── Refresh ─────────────────────────────────────────────────────────────────

registry.registerPath({
    method: "post",
    path: "/auth/refresh",
    summary: "Renovar token de acesso",
    description: "Gera um novo `accessToken` a partir do `refreshToken` armazenado nos cookies.",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Token renovado com sucesso. Novo cookie `accessToken` definido.",
            content: {
                "application/json": { schema: successSchema }
            }
        },
        401: {
            description: "Refresh token inválido, expirado ou sessão não encontrada.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        404: {
            description: "Sessão não encontrada.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        500: {
            description: "Erro interno do servidor.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
    }
});

// ─── Me ──────────────────────────────────────────────────────────────────────

registry.registerPath({
    method: "get",
    path: "/auth/me",
    summary: "Usuário autenticado",
    description: "Retorna os dados do usuário da sessão atual.",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Dados do usuário retornados com sucesso.",
            content: {
                "application/json": { schema: meResponseSchema }
            }
        },
        401: {
            description: "Não autenticado.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        400: {
            description: "Usuário não encontrado.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        500: {
            description: "Erro interno do servidor.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
    }
});

// ─── Verify Email ─────────────────────────────────────────────────────────────

registry.registerPath({
    method: "get",
    path: "/auth/verify-email",
    summary: "Verificar email",
    description: "Confirma o endereço de email usando o token recebido por email. O token expira em 24 horas.",
    tags: ["Auth - Email Verification"],
    request: {
        query: z.object({
            token: z.string().min(1).openapi({
                description: "Token de verificação recebido por email.",
                example: "a3f8c2e1b4d7...",
            })
        })
    },
    responses: {
        200: {
            description: "Email verificado com sucesso.",
            content: {
                "application/json": { schema: successWithMessageSchema }
            }
        },
        400: {
            description: "Token ausente, inválido, expirado ou email já verificado.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        500: {
            description: "Erro interno do servidor.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
    }
});

// ─── Resend Verification ──────────────────────────────────────────────────────

registry.registerPath({
    method: "post",
    path: "/auth/resend-verification",
    summary: "Reenviar email de verificação",
    description: "Gera um novo token e reenvia o email de verificação. Útil quando o link anterior expirou.",
    tags: ["Auth - Email Verification"],
    request: {
        body: {
            content: {
                "application/json": { schema: ResendVerificationDto }
            }
        }
    },
    responses: {
        200: {
            description: "Email de verificação reenviado com sucesso.",
            content: {
                "application/json": { schema: successWithMessageSchema }
            }
        },
        400: {
            description: "Email inválido ou já verificado.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        404: {
            description: "Usuário não encontrado.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
        500: {
            description: "Erro interno do servidor.",
            content: {
                "application/json": { schema: errorSchema }
            }
        },
    }
});
