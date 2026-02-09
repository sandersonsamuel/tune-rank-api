import { TypedRequest } from "@/shared/dtos/request.dto";
import { Response } from "express";
import { TrackService } from "./track.service";

export class TrackController {
    constructor(
        private readonly trackService: TrackService
    ) {}

    findById = async (req: TypedRequest<{ id: string }>, res: Response) => {
        const track = await this.trackService.findById(req.params.id);
        return res.status(200).json(track);
    };

    findManyByIds = async (req: TypedRequest<{}, {}, {ids: string}>, res: Response) => {
        const tracks = await this.trackService.findManyByIds(req.query.ids.split(","));
        return res.status(200).json(tracks);
    };
}
