import { z } from "zod";
import { Request } from "express";

// Schema para validação completa (usado no middleware de validação)
export const paramIdSchema = z.object({
    params: z.object({
        id: z.string()
    })
});

// Tipo apenas para os params
export interface ParamIdParams {
    id: string;
}

// Tipo para Request com params tipados corretamente
export type ParamIdRequestType = Request<ParamIdParams>;