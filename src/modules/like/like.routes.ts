import { Router } from "express";
import { Container } from "../../shared/container";
import { LikeController } from "./like.controller";
import { authMiddleware } from "../../shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "../../shared/middlewares/validation-request.middleware";
import { CreateLikeRequest } from "./like.dto";
import { paramIdDto } from "../../shared/dtos/params.dto";

export const likeRoutes = Router();

const likeController = Container.resolve<LikeController>("LikeController");

likeRoutes.get("/user", authMiddleware, likeController.getUserLikes);
likeRoutes.get("/:id", authMiddleware, validateRequest(paramIdDto), likeController.getUserLike);
likeRoutes.post("/", authMiddleware, validateRequest(CreateLikeRequest), likeController.create);
likeRoutes.delete("/:id", authMiddleware, validateRequest(paramIdDto), likeController.delete);
