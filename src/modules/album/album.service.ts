import createHttpError from "http-errors";
import { AlbumRepository } from "./album.repository";
import { CreateAlbumDtoType } from "./album.dto";

export class AlbumService {
    constructor(
        private readonly albumRepository: AlbumRepository
    ) {}

    create = async (data: CreateAlbumDtoType) => {
        const album = await this.albumRepository.create(data);
        return album;
    };

    findById = async (id: string) => {
        const album = await this.albumRepository.findById(id);
        
        if (!album) {
            throw createHttpError.NotFound("Album not found");
        }
        
        return album;
    };

    findAll = async () => {
        return this.albumRepository.findAll();
    };

    update = async (id: string, data: Partial<CreateAlbumDtoType>) => {
        const album = await this.albumRepository.update(id, data);
        
        if (!album) {
            throw createHttpError.NotFound("Album not found");
        }
        
        return album;
    };

    delete = async (id: string) => {
        await this.albumRepository.delete(id);
    };
}
