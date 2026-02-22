import { validateRequest } from "../../shared/middlewares/validation-request.middleware";
import { Router } from "express";
import { CreateUserRequest, LoginUserRequest } from "../user/user.dto";
import { Container } from "../../shared/container";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../shared/middlewares/jwt-handler.middleware";

export const authRoutes = Router()

const authController = Container.resolve<AuthController>("AuthController")

authRoutes.post('/register', validateRequest(CreateUserRequest), authController.register)
authRoutes.post('/login', validateRequest(LoginUserRequest), authController.login)
authRoutes.post('/logout', authMiddleware, authController.logout)
authRoutes.post('/refresh', authController.refreshAccessToken)
authRoutes.get('/me', authMiddleware, authController.me)
