import { Like } from "@/modules/like/like.domain";
import { CreateLikeDtoType } from "@/modules/like/like.dto";
import { LikeRepository } from "@/modules/like/like.repository";
import { LikeModel } from "../models/like.model";

export class MongoLikeRepository implements LikeRepository {
    
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
