import { Response } from "express";
import { AlbumService } from "./album.service";
import { CreateAlbumRequestType } from "./album.dto";

export class AlbumController {
    constructor(
        private readonly albumService: AlbumService
    ) {}

    create = async (req: CreateAlbumRequestType, res: Response) => {
        const album = await this.albumService.create(req.body);
        return res.status(201).json(album);
    };

    findById = async (req: any, res: Response) => {
        const album = await this.albumService.findById(req.params.id);
        return res.status(200).json(album);
    };

    findAll = async (req: any, res: Response) => {
        const albums = await this.albumService.findAll();
        return res.status(200).json(albums);
    };

    update = async (req: any, res: Response) => {
        const album = await this.albumService.update(req.params.id, req.body);
        return res.status(200).json(album);
    };

    delete = async (req: any, res: Response) => {
        await this.albumService.delete(req.params.id);
        return res.status(204).send();
    };
}
