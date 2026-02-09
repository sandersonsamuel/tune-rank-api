import { z } from "zod";
import { Request } from "express";

export const CreateAlbumDto = z.object({
    // Adicione os campos aqui
});

export type CreateAlbumDtoType = z.infer<typeof CreateAlbumDto>;

export const CreateAlbumRequest = z.object({
    body: CreateAlbumDto
});

export interface CreateAlbumRequestType extends Request {
    body: CreateAlbumDtoType;
}
