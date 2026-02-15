import { TypedRequest } from "../../shared/dtos/request.dto";
import { Response } from "express";
import { AlbumService } from "./album.service";

export class AlbumController {
    constructor(
        private readonly albumService: AlbumService
    ) {}

    findById = async (req: TypedRequest<{ id: string }>, res: Response) => {
        const album = await this.albumService.findById(req.params.id);
        return res.status(200).json(album);
    };

    findManyByIds = async (req: TypedRequest<{}, {}, {ids: string}>, res: Response) => {
        const {ids} = req.query
        const albums = await this.albumService.findManyByIds(ids.split(","));
        return res.status(200).json(albums);
    };
}
