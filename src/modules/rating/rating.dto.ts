import { Request } from "express";
import { z } from "zod";
import { CreateRatingDto, GetRatingsByUserIdDto } from "./rating.schema";

export type CreateRatingDtoType = z.infer<typeof CreateRatingDto>;

export interface CreateRatingRequestType extends Request {
    body: CreateRatingDtoType;
}

export type GetRatingsByUserIdDtoType = z.infer<typeof GetRatingsByUserIdDto>;

export interface GetRatingsByUserIdRequestType extends Request {
    query: GetRatingsByUserIdDtoType;
}