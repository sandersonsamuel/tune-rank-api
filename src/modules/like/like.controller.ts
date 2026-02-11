import { Response } from "express";
import { LikeService } from "./like.service";
import { CreateLikeRequestType } from "./like.dto";

export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ) {}

    create = async (req: CreateLikeRequestType, res: Response) => {
        const like = await this.likeService.create(req.body);
        return res.status(201).json(like);
    };

    delete = async (req: any, res: Response) => {
        await this.likeService.delete(req.params.id);
        return res.status(204).send();
    };
}
