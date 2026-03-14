export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}