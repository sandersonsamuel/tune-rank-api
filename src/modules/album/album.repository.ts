import { Album } from "./album.domain";
import { CreateAlbumDtoType } from "./album.dto";

export interface AlbumRepository {
    create(data: CreateAlbumDtoType): Promise<Album>;
    findById(id: string): Promise<Album | null>;
    findAll(): Promise<Album[]>;
    update(id: string, data: Partial<CreateAlbumDtoType>): Promise<Album | null>;
    delete(id: string): Promise<void>;
}
