import { Rating } from "../../../rating.domain";
import { CreateRatingDtoType } from "../../../rating.dto";
import { RatingRepository } from "../../../rating.repository";
import { RatingModel } from "../mongoose/models/rating.model";
import createHttpError from "http-errors";

export class MongoRatingRepository implements RatingRepository {

    async findOneByReleaseAndUserId(releaseId: string, userId: string): Promise<Rating | null> {
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
        const rating = await RatingModel.findOneAndUpdate(
            {
                userId,
                releaseId: data.releaseId,
            },
            {
                $set: {
                    review: data.review,
                    type: data.type,
                    rating: data.rating,
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        if (!rating) {
            throw new createHttpError.InternalServerError("Failed to create rating");
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

    async findManyByReleaseId(releaseId: string): Promise<Rating[] | []> {
        const ratings = await RatingModel.find({ releaseId }).sort({ createdAt: 1 })

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
}