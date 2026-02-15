import { User } from "./user.domain";
import { CreateUserDtoType } from "./user.dto";

export interface UserRepository {
    create(user: CreateUserDtoType): Promise<User & { password: string }>
    findById(id: string): Promise<User & { password: string } | null>
    findByEmail(email: string): Promise<User & { password: string } | null>
    findManyByIds(ids: string[]): Promise<User[]>
}