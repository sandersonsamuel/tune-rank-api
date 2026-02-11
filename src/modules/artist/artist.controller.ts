import { Response } from "express";
import { ArtistService } from "./artist.service";
import { TypedRequest } from "@/shared/dtos/request.dto";

export class ArtistController {
    constructor(
        private readonly artistService: ArtistService
    ) {}

    findById = async (req: TypedRequest<{id: string}>, res: Response) => {
        const artist = await this.artistService.findById(req.params.id);
        return res.status(200).json(artist);
    };

}
