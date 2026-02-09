import { JWTPayload } from "jose"

export interface IJWTProvider {
    generateAccessToken(userId: string): Promise<string>
    generateRefreshToken(userId: string): Promise<string>
    validateToken(token: string): Promise<JWTPayload>
}