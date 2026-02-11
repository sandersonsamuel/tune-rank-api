import { Rating } from "@/modules/rating/rating.domain";
import { RatingTypeSchema } from "@/modules/rating/rating.schema";
import { model, Schema } from "mongoose";

const ratingSchema = new Schema<Rating>({
    userId: { type: String, required: true },
    releaseId: { type: String, required: true },
    review: { type: String, required: true },
    type: { type: String, enum: RatingTypeSchema.enum, required: true },
    rating: { type: Number, required: true },
}, { timestamps: true })

export const RatingModel = model<Rating>("Rating", ratingSchema)