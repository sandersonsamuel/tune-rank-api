export interface User {
    id: string;
    name: string;
    email: string;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}