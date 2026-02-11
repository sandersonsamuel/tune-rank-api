import { z } from "zod/v4";
import { RatingTypeSchema } from "../rating/rating.schema";

export const LikeSchema = z.object({
    id: z.string(),
    userId: z.string(),
    releaseId: z.string(),
    type: RatingTypeSchema,
});