import { z } from "zod";
import { Request } from "express";
import { RatingTypeSchema } from "../rating/rating.schema";

export const CreateLikeDto = z.object({
    releaseId: z.string(),
    type: RatingTypeSchema
});

export type CreateLikeDtoType = z.infer<typeof CreateLikeDto>;

export const CreateLikeRequest = z.object({
    body: CreateLikeDto
});

export interface CreateLikeRequestType extends Request {
    body: CreateLikeDtoType;
}
