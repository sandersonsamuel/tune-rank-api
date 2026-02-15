import { env } from "../../../../configs/env";
import { IJWTProvider } from "../../../providers/token.provider";
import * as jose from "jose"

export class JoseTokenProvider implements IJWTProvider {

    async generateAccessToken(userId: string): Promise<string> {
        return await new jose.SignJWT({
            userId
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(env.JWT_SECRET))
    }

    async generateRefreshToken(userId: string): Promise<string> {
        return await new jose.SignJWT({
            userId
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(new TextEncoder().encode(env.JWT_SECRET))
    }

    async validateToken(token: string): Promise<jose.JWTPayload> {
        const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET))
        return payload
    }
}