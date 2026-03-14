import { CreateUserDtoType } from "./user.dto";
import { UserRepository } from "./user.repository";
import { IHashProvider } from "../../shared/providers/hash.provider";
import createHttpError from "http-errors";
import { User } from "./user.domain";
import { IJWTProvider } from "../../shared/providers/token.provider";
import { IMailProvider } from "@/shared/providers/mail.provider";
import { env } from "../../configs/env";
import { buildVerificationEmailHtml } from "../../shared/infra/mail/templates/verification-email.template";
import crypto from "crypto";

export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashProvider: IHashProvider,
        private readonly jwtProvider: IJWTProvider,
        private readonly mailProvider: IMailProvider
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

        const token = crypto.randomBytes(32).toString("hex")
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h

        await this.userRepository.setVerificationToken(userWithoutPassword.id, token, expires)

        const verificationUrl = `${env.CLIENT_URL}/verify-email?token=${token}`

        await this.mailProvider.sendEmail(
            user.email,
            "Confirme seu email – TuneRank",
            buildVerificationEmailHtml(userWithoutPassword.name, verificationUrl)
        )

        return userWithoutPassword
    }

    async verifyEmail(token: string): Promise<void> {
        const user = await this.userRepository.findByVerificationToken(token)

        if (!user) {
            throw new createHttpError.BadRequest("Token de verificação inválido")
        }

        if (user.emailVerified) {
            throw new createHttpError.BadRequest("Email já verificado")
        }

        const expires = (user as any).emailVerificationTokenExpires as Date | null
        if (!expires || expires < new Date()) {
            throw new createHttpError.BadRequest("Token de verificação expirado")
        }

        await this.userRepository.markEmailAsVerified(user.id)
    }

    async resendVerificationEmail(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new createHttpError.NotFound("Usuário não encontrado")
        }

        if (user.emailVerified) {
            throw new createHttpError.BadRequest("Email já verificado")
        }

        const token = crypto.randomBytes(32).toString("hex")
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h

        await this.userRepository.setVerificationToken((user as any)._id?.toString() ?? user.id, token, expires)

        const verificationUrl = `${env.CLIENT_URL}/verify-email?token=${token}`

        await this.mailProvider.sendEmail(
            email,
            "Confirme seu email – TuneRank",
            buildVerificationEmailHtml(user.name, verificationUrl)
        )
    }

}
