import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequest = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req)
        next()
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json(error.issues)
        }
    }
}