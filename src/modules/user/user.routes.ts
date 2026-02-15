import { Router } from "express";
import { UserController } from "./user.controller";
import { Container } from "../../shared/container";
import { authMiddleware } from "../../shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "../../shared/middlewares/validation-request.middleware";
import { paramIdDto } from "../../shared/dtos/params.dto";

export const userRoutes = Router()

const userController = Container.resolve<UserController>("UserController")

userRoutes.get('/:id', authMiddleware, validateRequest(paramIdDto), userController.getUserById)