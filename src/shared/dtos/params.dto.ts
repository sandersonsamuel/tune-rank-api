import { z } from "zod";
import { Request } from "express";

export const paramIdDto = z.object({
    params: z.object({
        id: z.string()
    })
});

export interface ParamIdParams {
    id: string;
}
export type ParamIdRequestType = Request<ParamIdParams>;