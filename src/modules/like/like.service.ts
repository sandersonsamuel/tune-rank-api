import { LikeRepository } from "./like.repository";
import { CreateLikeDtoType } from "./like.dto";
import { TrackService } from "../track/track.service";
import createHttpError from "http-errors";

export class LikeService {
    constructor(
        private readonly likeRepository: LikeRepository,
        private readonly trackService: TrackService,
    ) {}

    create = async (data: CreateLikeDtoType, userId: string) => {
        const track = await this.trackService.findById(data.releaseId);

        if (!track) {
            throw new createHttpError.NotFound("Track not found");
        }

        const like = await this.likeRepository.create(data, userId);
        return like;
    };
    
    delete = async (userId: string, releaseId: string) => {
        await this.likeRepository.delete(userId, releaseId);
    };
}
