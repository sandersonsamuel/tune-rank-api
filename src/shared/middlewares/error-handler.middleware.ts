import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message })
    }

    console.error("Erro do servidor: ", err.message)
    return res.status(500).json({ error: 'Internal server error' })
}