import { Container } from "@/shared/container"
import { MongoUserRepository } from "@/modules/user/infra/database/mongoose/repositories/mongo.user.repository"
import { MongoAuthRepository } from "@/modules/auth/infra/database/mongoose/repositories/mongo.auth.repository"
import { BcryptRepository } from "../infra/hash/providers/bcrypt.provider"
import { JoseTokenProvider } from "../infra/token/providers/jose.provider"
import { AuthService } from "@/modules/auth/auth.service"
import { UserService } from "@/modules/user/user.service"
import { AuthController } from "@/modules/auth/auth.controller"
import { UserController } from "@/modules/user/user.controller"

export const registerDependencies = () => {
    const green = '\x1b[32m'
    const reset = '\x1b[0m'
    const bold = '\x1b[1m'

    console.log(`${green}${bold}[Dependency Container]${reset} ${green}Initializing...${reset}\n`)

    // Repositories
    console.log(`${green}${bold}[Repositories]${reset}`)
    Container.register("MongoUserRepository", () => new MongoUserRepository())
    console.log(`${green}  ✓ MongoUserRepository${reset}`)

    Container.register("MongoAuthRepository", () => new MongoAuthRepository())
    console.log(`${green}  ✓ MongoAuthRepository${reset}`)

    // Providers
    console.log(`\n${green}${bold}[Providers]${reset}`)
    Container.register("BCryptProvider", () => new BcryptRepository())
    console.log(`${green}  ✓ BCryptProvider${reset}`)

    Container.register("JWTProvider", () => new JoseTokenProvider())
    console.log(`${green}  ✓ JWTProvider${reset}`)

    // Services
    console.log(`\n${green}${bold}[Services]${reset}`)
    Container.register("AuthService", () => new AuthService(
        Container.resolve("MongoAuthRepository"),
        Container.resolve("BCryptProvider"),
        Container.resolve("MongoUserRepository"),
        Container.resolve("JWTProvider")
    ))
    console.log(`${green}  ✓ AuthService${reset}`)

    Container.register("UserService", () => new UserService(
        Container.resolve("MongoUserRepository"),
        Container.resolve("BCryptProvider"),
        Container.resolve("JWTProvider")
    ))
    console.log(`${green}  ✓ UserService${reset}`)

    // Controllers
    console.log(`\n${green}${bold}[Controllers]${reset}`)
    Container.register("AuthController", () => new AuthController(
        Container.resolve("UserService"),
        Container.resolve("AuthService")
    ))
    console.log(`${green}  ✓ AuthController${reset}`)

    Container.register("UserController", () => new UserController(
        Container.resolve("UserService")
    ))
    console.log(`${green}  ✓ UserController${reset}`)

    console.log(`\n${green}${bold}[Dependency Container]${reset} ${green}Successfully initialized!${reset}\n`)
}