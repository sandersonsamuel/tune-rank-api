import { Like } from "./like.domain";
import { CreateLikeDtoType } from "./like.dto";

export interface LikeRepository {
    create(data: CreateLikeDtoType, userId: string): Promise<Like>;
    delete(userId: string, releaseId: string): Promise<void>;
    findUserLikes(userId: string): Promise<Like[]>;
    findUserLike(userId: string, releaseId: string): Promise<Like | null>;
}
