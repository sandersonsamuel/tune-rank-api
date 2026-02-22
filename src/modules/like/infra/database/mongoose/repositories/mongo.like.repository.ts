import { Like } from "../../../../like.domain";
import { CreateLikeDtoType } from "../../../../like.dto";
import { LikeRepository } from "../../../../like.repository";
import { LikeModel } from "../models/like.model";

export class MongoLikeRepository implements LikeRepository {

    async findUserLike(userId: string, releaseId: string): Promise<Like | null> {
        const like = await LikeModel.findOne({ userId, releaseId });

        if (!like) {
            return null;
        }

        return {
            id: like._id.toString(),
            userId: like.userId,
            releaseId: like.releaseId,
            type: like.type,
        };
    }

    async findUserLikes(userId: string): Promise<Like[]> {
        const likes = await LikeModel.find({ userId });

        return likes.map((like) => ({
            id: like._id.toString(),
            userId: like.userId,
            releaseId: like.releaseId,
            type: like.type,
        }));
    }
    
    async create(data: CreateLikeDtoType, userId: string): Promise<Like> {
        const created = await LikeModel.create({
            userId,
            releaseId: data.releaseId,
            type: data.type,
        });
        
        return {
            id: created._id.toString(),
            userId: created.userId,
            releaseId: created.releaseId,
            type: created.type,
        };
    }

    async delete(userId: string, releaseId: string): Promise<void> {
        await LikeModel.findOneAndDelete({ userId, releaseId });
    }
}
