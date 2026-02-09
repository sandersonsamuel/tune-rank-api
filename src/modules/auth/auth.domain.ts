export interface Session {
    id: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: Date;
    createdAt: Date;
    updatedAt: Date;
}