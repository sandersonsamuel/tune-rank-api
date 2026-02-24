import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const RatingTypeSchema = z.enum(["ALBUM", "TRACK"])

export const CreateRatingDto = z.object({
    releaseId: z.string(),
    review: z.string().optional(),
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

export const RatingDistributionSchema = z.object({
    rating: z.number().openapi({ description: "Valor da nota (0.5 a 5.0)", example: 4.5 }),
    count: z.number().openapi({ description: "Quantidade de avaliações com essa nota", example: 12 }),
});

export const RatingsByReleaseSchema = z.object({
    distribution: z.array(RatingDistributionSchema).openapi({ description: "Distribuição das avaliações por nota" }),
    average: z.number().openapi({ description: "Média das avaliações", example: 3.8 }),
    total: z.number().openapi({ description: "Total de avaliações", example: 42 }),
});

export const GetRatingsByUserIdDto = z.object({
    userId: z.string().optional()
});

export const GetRatingsByUserIdRequest = z.object({
    query: GetRatingsByUserIdDto
});