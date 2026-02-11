import { Router } from "express";
import { Container } from "@/shared/container";
import { LikeController } from "./like.controller";
import { authMiddleware } from "@/shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { CreateLikeRequest } from "./like.dto";

export const likeRoutes = Router();

const likeController = Container.resolve<LikeController>("LikeController");

likeRoutes.post("/", authMiddleware, validateRequest(CreateLikeRequest), likeController.create);
likeRoutes.get("/", authMiddleware, likeController.findAll);
likeRoutes.get("/:id", authMiddleware, likeController.findById);
likeRoutes.put("/:id", authMiddleware, likeController.update);
likeRoutes.delete("/:id", authMiddleware, likeController.delete);
