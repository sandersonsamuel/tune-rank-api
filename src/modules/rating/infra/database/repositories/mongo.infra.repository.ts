import { Rating } from "@/modules/rating/rating.domain";
import { CreateRatingDtoType } from "@/modules/rating/rating.dto";
import { RatingRepository } from "@/modules/rating/rating.repository";
import { RatingModel } from "../mongoose/models/rating.model";
import { AppError } from "@/shared/errors/app.error";

export class MongoRatingRepository implements RatingRepository {

    async findByUserIdAndReleaseId(releaseId: string, userId: string): Promise<Rating | null> {
        const rating = await RatingModel.findOne({ releaseId, userId });

        if (!rating) {
            return null;
        }

        return {
            id: rating._id.toString(),
            userId: rating.userId,
            releaseId: rating.releaseId,
            review: rating.review,
            type: rating.type,
            rating: rating.rating,
            createdAt: rating.createdAt,
            updatedAt: rating.updatedAt
        };
    }

    async create(data: CreateRatingDtoType, userId: string): Promise<Rating> {
        const rating = await RatingModel.create({
            userId,
            releaseId: data.releaseId,
            review: data.review,
            type: data.type,
            rating: data.rating
        });

        if (!rating) {
            throw new AppError("Failed to create rating", 500);
        }

        return {
            id: rating._id.toString(),
            userId: rating.userId,
            releaseId: rating.releaseId,
            review: rating.review,
            type: rating.type,
            rating: rating.rating,
            createdAt: rating.createdAt,
            updatedAt: rating.updatedAt
        };
    }

    async findByUserId(userId: string): Promise<Rating[] | []> {
        const ratings = await RatingModel.find({ userId }).sort({ createdAt: 1 })

        if (!ratings) {
            return [];
        }

        return ratings.map(rating => ({
            id: rating._id.toString(),
            userId: rating.userId,
            releaseId: rating.releaseId,
            review: rating.review,
            type: rating.type,
            rating: rating.rating,
            createdAt: rating.createdAt,
            updatedAt: rating.updatedAt
        }));
    }

    async findByReleaseId(releaseId: string): Promise<Rating | null> {
        const rating = await RatingModel.findOne({ releaseId }).sort({ createdAt: 1 })

        if (!rating) {
            return null;
        }

        return {
            id: rating._id.toString(),
            userId: rating.userId,
            releaseId: rating.releaseId,
            review: rating.review,
            type: rating.type,
            rating: rating.rating,
            createdAt: rating.createdAt,
            updatedAt: rating.updatedAt
        }
    }
}