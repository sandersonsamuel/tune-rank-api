import { Request } from "express";
import z from "zod/v4";

export type TypedRequest<P = {}, B = {}, Q = {}> = Request<P, any, B, Q>;

export type ParamIdRequestType = TypedRequest<{ id: string }>;

export const QueryTypedDto = (schema: z.ZodTypeAny) => {
    return z.object({
        query: schema
    })
}