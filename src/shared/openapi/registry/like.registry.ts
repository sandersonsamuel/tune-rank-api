import { CreateLikeDto } from "@/modules/like/like.dto";
import { LikeSchema } from "@/modules/like/like.schema";
import { errorSchema } from "@/schemas/errors/error.zod.schema";
import { validationErrorSchema } from "@/schemas/errors/validation-error.zod.schema";
import { StatusCodes } from "http-status-codes";
import z from "zod/v4";
import { registry } from "..";

registry.register("CreateLikeDto", CreateLikeDto);
registry.register("Like", LikeSchema);

registry.registerPath({
    method: "post",
    path: "/like",
    tags: ["Like"],
    summary: "Create a like",
    description: "Like a track",
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
            description: "Like created successfully",
            content: {
                "application/json": {
                    schema: LikeSchema,
                },
            },
        },
        [StatusCodes.BAD_REQUEST]: {
            description: "Invalid request",
            content: {
                "application/json": {
                    schema: validationErrorSchema,
                },
            },
        },
        [StatusCodes.UNAUTHORIZED]: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
        [StatusCodes.NOT_FOUND]: {
            description: "Track not found",
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
    summary: "Delete a like",
    description: "Remove a like by release ID",
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID of the release to unlike", example: "4aawyAB9vmqN3uQ7FjRGTy" })
        })
    },
    responses: {
        [StatusCodes.NO_CONTENT]: {
            description: "Like deleted successfully",
        },
        [StatusCodes.UNAUTHORIZED]: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
        [StatusCodes.NOT_FOUND]: {
            description: "Like not found",
            content: {
                "application/json": {
                    schema: errorSchema,
                },
            },
        },
    },
});
