import { z } from "zod";
import { Request } from "express";

export const CreateTrackDto = z.object({
    // Adicione os campos aqui
});

export type CreateTrackDtoType = z.infer<typeof CreateTrackDto>;

export const CreateTrackRequest = z.object({
    body: CreateTrackDto
});

export interface CreateTrackRequestType extends Request {
    body: CreateTrackDtoType;
}
