import { LikeRepository } from "./like.repository";
import { CreateLikeDtoType } from "./like.dto";
import { TrackService } from "../track/track.service";
import createHttpError from "http-errors";
import { AlbumService } from "../album/album.service";

export class LikeService {
    constructor(
        private readonly likeRepository: LikeRepository,
        private readonly trackService: TrackService,
        private readonly albumService: AlbumService,
    ) { }

    getUserLike = async (userId: string, releaseId: string) => {
        const like = await this.likeRepository.findUserLike(userId, releaseId);
        return like;
    }

    getUserLikes = async (userId: string) => {
        const likes = await this.likeRepository.findUserLikes(userId);

        const trackIds = likes.filter((like) => like.type === "TRACK").map((like) => like.releaseId);
        const albumIds = likes.filter((like) => like.type === "ALBUM").map((like) => like.releaseId);

        const tracks = trackIds.length > 0 ? await this.trackService.findManyByIds(trackIds) : [];
        const albums = albumIds.length > 0 ? await this.albumService.findManyByIds(albumIds) : [];

        return { tracks, albums };
    };

    create = async (data: CreateLikeDtoType, userId: string) => {

        const releaseCall = data.type === "TRACK" ?
            this.trackService.findById(data.releaseId) :
            this.albumService.findById(data.releaseId);

        const release = await releaseCall;

        if (!release) {
            throw new createHttpError.NotFound("Release not found");
        }

        const isLiked = await this.likeRepository.findUserLike(userId, data.releaseId);


        if (isLiked) {
            throw new createHttpError.Conflict("You already liked this release");
        }

        const like = await this.likeRepository.create(data, userId);
        return like;
    };

    delete = async (userId: string, releaseId: string) => {
        await this.likeRepository.delete(userId, releaseId);
    };
}
