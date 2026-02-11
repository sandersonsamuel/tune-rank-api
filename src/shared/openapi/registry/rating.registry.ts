import { CreateRatingDto, GetRatingsByUserIdDto, RatingSchema, RatingTypeSchema } from "@/modules/rating/rating.schema";
import { errorSchema } from "@/schemas/errors/error.zod.schema";
import { validationErrorSchema } from "@/schemas/errors/validation-error.zod.schema";
import { StatusCodes } from "http-status-codes";
import z from "zod/v4";
import { registry } from "..";

registry.register("RatingType", RatingTypeSchema);

registry.register("CreateRatingDto", CreateRatingDto);

registry.registerPath({
    method: "post",
    path: "/rating/create",
    tags: ["Rating"],
    summary: "Create a new rating",
    description: "Create a new rating",
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
            description: "Rating created successfully",
            content: {
                "application/json": {
                    schema: RatingSchema,
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
    },
});

registry.registerPath({
    method: "get",
    path: "/rating/user",
    tags: ["Rating"],
    summary: "Get ratings by user",
    description: "Get ratings by user",
    request: {
        query: GetRatingsByUserIdDto
    },
    responses: {
        [StatusCodes.OK]: {
            description: "Ratings retrieved successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            albums: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/SpotifyAlbum"
                                }
                            },
                            tracks: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/SpotifyTrack"
                                }
                            }
                        }
                    }
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
    },
});

registry.registerPath({
    method: "get",
    path: "/rating/release/{id}",
    tags: ["Rating"],
    summary: "Get rating by release ID",
    description: "Get the authenticated user's rating for a specific release",
    request: {
        params: z.object({
            id: z.string().openapi({ description: "ID of the release (album or track)", example: "4aawyAB9vmqN3uQ7FjRGTy" })
        })
    },
    responses: {
        [StatusCodes.OK]: {
            description: "Rating retrieved successfully",
            content: {
                "application/json": {
                    schema: RatingSchema,
                },
            },
        },
        [StatusCodes.NOT_FOUND]: {
            description: "Rating not found",
            content: {
                "application/json": {
                    schema: errorSchema,
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
    },
});

