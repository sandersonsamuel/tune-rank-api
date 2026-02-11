import { Response, Request } from "express";
import { RatingService } from "./rating.service";
import { CreateRatingRequestType } from "./rating.dto";
import { TypedRequest } from "@/shared/dtos/request.dto";

export class RatingController {
    constructor(
        private readonly ratingService: RatingService
    ) {}

    create = async (req: CreateRatingRequestType, res: Response) => {
        const rating = await this.ratingService.create(req.body, req.user.userId);
        return res.status(201).json(rating);
    };

    getRatingsByUserId = async (req: TypedRequest<{}, {}, { userId?: string }>, res: Response) => {
        const user = req.query.userId || req.user.userId;
        const ratings = await this.ratingService.getByUserId(user);
        return res.status(200).json(ratings);
    };

    getRatingByReleaseId = async (req: TypedRequest<{ releaseId: string }>, res: Response) => {
        const rating = await this.ratingService.getByReleaseId(req.params.releaseId, req.user.userId);
        return res.status(200).json(rating);
    };
}
