import { Album } from "@/modules/album/album.domain";
import { CreateAlbumDtoType } from "@/modules/album/album.dto";
import { AlbumRepository } from "@/modules/album/album.repository";
import { AlbumModel } from "../models/album.model";

export class MongoAlbumRepository implements AlbumRepository {
    
    async create(data: CreateAlbumDtoType): Promise<Album> {
        const created = await AlbumModel.create(data);
        
        return {
            id: created._id.toString(),
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
        };
    }

    async findById(id: string): Promise<Album | null> {
        const found = await AlbumModel.findById(id);
        
        if (!found) return null;
        
        return {
            id: found._id.toString(),
            createdAt: found.createdAt,
            updatedAt: found.updatedAt,
        };
    }

    async findAll(): Promise<Album[]> {
        const all = await AlbumModel.find();
        
        return all.map((item) => ({
            id: item._id.toString(),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));
    }

    async update(id: string, data: Partial<CreateAlbumDtoType>): Promise<Album | null> {
        const updated = await AlbumModel.findByIdAndUpdate(id, data, { new: true });
        
        if (!updated) return null;
        
        return {
            id: updated._id.toString(),
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        };
    }

    async delete(id: string): Promise<void> {
        await AlbumModel.findByIdAndDelete(id);
    }
}
