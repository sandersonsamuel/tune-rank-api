import { User } from "@/modules/user/user.domain";
import { CreateUserDtoType } from "@/modules/user/user.dto";

export interface UserRepository {
    create(user: CreateUserDtoType): Promise<User & { password: string }>
    findById(id: string): Promise<User & { password: string } | null>
    findByEmail(email: string): Promise<User & { password: string } | null>
    findManyByIds(ids: string[]): Promise<User[]>
}