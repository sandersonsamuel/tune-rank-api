import createHttpError from "http-errors";
import { LikeRepository } from "./like.repository";
import { CreateLikeDtoType } from "./like.dto";

export class LikeService {
    constructor(
        private readonly likeRepository: LikeRepository
    ) {}

    create = async (data: CreateLikeDtoType) => {
        const like = await this.likeRepository.create(data);
        return like;
    };

    findById = async (id: string) => {
        const like = await this.likeRepository.findById(id);
        
        if (!like) {
            throw createHttpError.NotFound("Like not found");
        }
        
        return like;
    };

    findAll = async () => {
        return this.likeRepository.findAll();
    };

    update = async (id: string, data: Partial<CreateLikeDtoType>) => {
        const like = await this.likeRepository.update(id, data);
        
        if (!like) {
            throw createHttpError.NotFound("Like not found");
        }
        
        return like;
    };

    delete = async (id: string) => {
        await this.likeRepository.delete(id);
    };
}
