import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const RatingTypeSchema = z.enum(["ALBUM", "TRACK"])

export const CreateRatingDto = z.object({
    releaseId: z.string(),
    review: z.string(),
    type: RatingTypeSchema,
    rating: z.number()
});

export const CreateRatingRequest = z.object({
    body: CreateRatingDto
});

export const RatingSchema = z.object({
    id: z.string(),
    userId: z.string(),
    releaseId: z.string(),
    review: z.string(),
    type: RatingTypeSchema,
    rating: z.number(),
    createdAt: z.date(),
    updatedAt: z.date()
});

export const GetRatingsByUserIdDto = z.object({
    userId: z.string().optional()
});

export const GetRatingsByUserIdRequest = z.object({
    query: GetRatingsByUserIdDto
});