import { NextFunction, Request, Response } from "express";

export const handleInvalidJson = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in req) {
        return res.status(400).json({ error: 'Invalid JSON' })
    }
    next()
}