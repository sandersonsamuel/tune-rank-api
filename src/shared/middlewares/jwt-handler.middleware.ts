import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Container } from "../container";
import { JoseTokenProvider } from "../infra/token/providers/jose.provider";
import { JWTPayload } from "jose";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtProvider = Container.resolve<JoseTokenProvider>("JWTProvider")

        const accessToken = req.signedCookies?.accessToken

        if (!accessToken) {
            throw new createHttpError.Unauthorized("Unauthorized")
        }

        const decodedAccessToken = await jwtProvider.validateToken(accessToken)
        req.user = decodedAccessToken as JWTPayload & { userId: string }

        next()
    } catch (error) {
        next(error)
    }
}