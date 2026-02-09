import { Session } from "@/modules/auth/auth.domain";

export interface AuthRepository {
    createSession(userId: string, accessToken: string, refreshToken: string): Promise<Session>
    deleteSession(userId: string): Promise<void>
    findByRefreshToken(refreshToken: string): Promise<Session | null>
    updateAccessToken(refreshToken: string, accessToken: string): Promise<void>
}