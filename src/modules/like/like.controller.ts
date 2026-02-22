import { Response } from "express";
import { LikeService } from "./like.service";
import { CreateLikeRequestType } from "./like.dto";
import { TypedRequest } from "../../shared/dtos/request.dto";

export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ) {}

    getUserLikes = async (req: TypedRequest, res: Response) => {
        const userId = req.user.userId;
        const likes = await this.likeService.getUserLikes(userId);
        return res.status(200).json(likes);
    };

    getUserLike = async (req: TypedRequest<{id: string}>, res: Response) => {
        const userId = req.user.userId;
        const like = await this.likeService.getUserLike(userId, req.params.id);
        return res.status(200).json(like);
    };

    create = async (req: CreateLikeRequestType, res: Response) => {
        const userId = req.user.userId;
        const like = await this.likeService.create(req.body, userId);
        return res.status(201).json(like);
    };

    delete = async (req: TypedRequest<{id: string}>, res: Response) => {
        const userId = req.user.userId;
        await this.likeService.delete(userId, req.params.id);
        return res.status(204).send();
    };
}
