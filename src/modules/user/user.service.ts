import { CreateUserDtoType, LoginUserDtoType } from "./user.dto";
import { UserRepository } from "./user.repository";
import { IHashProvider } from "../../shared/providers/hash.provider";
import createHttpError from "http-errors";
import { User } from "./user.domain";
import { IJWTProvider } from "../../shared/providers/token.provider";

export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashProvider: IHashProvider,
        private readonly jwtProvider: IJWTProvider,
    ) { }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id)
        
        if (!user) {
            throw new createHttpError.BadRequest('User not found')
        }
        return user
    }

    async createUser(user: CreateUserDtoType): Promise<User> {

        const userExists = await this.userRepository.findByEmail(user.email)

        if (userExists) {
            throw new createHttpError.BadRequest('User already exists')
        }

        user.password = await this.hashProvider.generateHash(user.password)

        const { password, ...userWithoutPassword } = await this.userRepository.create(user)

        return userWithoutPassword
    }

    async loginUser(user: LoginUserDtoType): Promise<User & { token: string }> {
        const userExists = await this.userRepository.findByEmail(user.email)

        if (!userExists) {
            throw new createHttpError.BadRequest('User not found')
        }

        const isPasswordValid = await this.hashProvider.compareHash(user.password, userExists.password)

        if (!isPasswordValid) {
            throw new createHttpError.BadRequest('Invalid password')
        }

        const token = await this.jwtProvider.generateAccessToken(userExists.id)



        return {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            token,
            createdAt: userExists.createdAt,
            updatedAt: userExists.updatedAt,
        }
    }

}