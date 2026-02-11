import { z } from "zod";
import { RatingSchema, RatingTypeSchema } from "./rating.schema";

export type Rating = z.infer<typeof RatingSchema>

export type RatingType = z.infer<typeof RatingTypeSchema>
