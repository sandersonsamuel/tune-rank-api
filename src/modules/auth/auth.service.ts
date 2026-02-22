import { IHashProvider } from "../../shared/providers/hash.provider";
import createHttpError from "http-errors";
import { LoginUserDtoType } from "../user/user.dto";
import { UserRepository } from "../user/user.repository";
import { AuthRepository } from "./auth.repository";
import { IJWTProvider } from "../../shared/providers/token.provider";

export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly hashProvider: IHashProvider,
        private readonly userRepository: UserRepository,
        private readonly tokenProvider: IJWTProvider
    ) { }

    async login(user: LoginUserDtoType) {

        const userExists = await this.userRepository.findByEmail(user.email)

        if (!userExists) {
            throw new createHttpError.NotFound("User not found")
        }

        const isPasswordValid = await this.hashProvider.compareHash(user.password, userExists.password)

        if (!isPasswordValid) {
            throw new createHttpError.BadRequest("Invalid password")
        }

        const accessToken = await this.tokenProvider.generateAccessToken(userExists.id)
        const refreshToken = await this.tokenProvider.generateRefreshToken(userExists.id)

        await this.authRepository.createSession(userExists.id, accessToken, refreshToken)

        return {
            accessToken,
            refreshToken
        }
    }

    async logout(userId: string) {
        await this.authRepository.deleteSession(userId)
    }

    async refreshAccessToken(refreshToken: string) {
        const session = await this.authRepository.findByRefreshToken(refreshToken)

        if (!session) {
            throw new createHttpError.NotFound("Session not found")
        }

        const { userId } = await this.tokenProvider.validateToken(refreshToken)

        if (session.userId !== userId) {
            throw new createHttpError.Unauthorized("Unauthorized")
        }

        if (session.expiresIn < new Date()) {
            throw new createHttpError.Unauthorized("Session expired")
        }

        const newAccessToken = await this.tokenProvider.generateAccessToken(userId)

        await this.authRepository.updateAccessToken(refreshToken, newAccessToken)

        return {
            accessToken: newAccessToken
        }
    }

}