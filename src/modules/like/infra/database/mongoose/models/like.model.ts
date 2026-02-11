import { RatingTypeSchema } from "@/modules/rating/rating.schema";
import { model, Schema } from "mongoose";

const likeSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    releaseId: {
        type: String,
        required: true,
    },
    type: {
        type: String, enum: RatingTypeSchema.enum,
        required: true,
    },
});

export const LikeModel = model("Like", likeSchema);
