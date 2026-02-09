import { Router } from "express";
import { Container } from "@/shared/container";
import { AlbumController } from "./album.controller";
import { authMiddleware } from "@/shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { CreateAlbumRequest } from "./album.dto";

export const albumRoutes = Router();

const albumController = Container.resolve<AlbumController>("AlbumController");

albumRoutes.post("/", authMiddleware, validateRequest(CreateAlbumRequest), albumController.create);
albumRoutes.get("/", authMiddleware, albumController.findAll);
albumRoutes.get("/:id", authMiddleware, albumController.findById);
albumRoutes.put("/:id", authMiddleware, albumController.update);
albumRoutes.delete("/:id", authMiddleware, albumController.delete);
