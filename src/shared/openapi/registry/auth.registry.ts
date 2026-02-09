import { CreateUserDto, LoginUserDto } from "@/modules/user/user.dto";
import { registry } from "..";
import { validationErrorSchema } from "@/schemas/errors/validation-error.zod.schema";
import { errorSchema } from "@/schemas/errors/error.zod.schema";
import { successSchema } from "@/schemas/success";

registry.register("CreateUserDto", CreateUserDto);

registry.register("LoginUserDto", LoginUserDto);

registry.registerPath({
    method: "post",
    path: "/auth/login",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: LoginUserDto
                }
            }
        }
    },
    summary: "Login",
    description: "Login",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Login successful",
            content: {
                "application/json": {
                    schema: successSchema
                }
            }
        },
        400: {
            description: "Invalid body request",
            content: {
                "application/json": {
                    schema: validationErrorSchema
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
    }
})

registry.registerPath({
    method: "post",
    path: "/auth/register",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateUserDto
                }
            }
        }
    },
    summary: "Register",
    description: "Register",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Register successful",
            content: {
                "application/json": {
                    schema: CreateUserDto
                }
            }
        },
        400: {
            description: "Invalid body request",
            content: {
                "application/json": {
                    schema: validationErrorSchema
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
    }
})

registry.registerPath({
    method: "post",
    path: "/auth/logout",
    summary: "Logout",
    description: "Logout",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Logout successful",
            content: {
                "application/json": {
                    schema: successSchema
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
        400:{
            description: "Invalid body request",
            content: {
                "application/json": {
                    schema: validationErrorSchema
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
    }
})

registry.registerPath({
    method: "post",
    path: "/auth/refresh",
    summary: "Refresh",
    description: "Refresh access token",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Refresh successful",
            content: {
                "application/json": {
                    schema: successSchema
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
        400:{
            description: "Invalid body request",
            content: {
                "application/json": {
                    schema: validationErrorSchema
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
    }
})

registry.registerPath({
    method: "get",
    path: "/auth/me",
    summary: "Me",
    description: "Get current user",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Get me successful",
            content: {
                "application/json": {
                    schema: successSchema
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
    }
})
