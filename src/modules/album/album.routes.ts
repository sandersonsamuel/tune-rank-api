import { Container } from "@/shared/container";
import { queryIdsDto } from "@/shared/dtos/query.dto";
import { authMiddleware } from "@/shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { Router } from "express";
import { AlbumController } from "./album.controller";
import { paramIdDto } from "@/shared/dtos/params.dto";

export const albumRoutes = Router();

const albumController = Container.resolve<AlbumController>("AlbumController");

albumRoutes.get("/:id", authMiddleware, validateRequest(paramIdDto), albumController.findById);
albumRoutes.get("/", authMiddleware, validateRequest(queryIdsDto), albumController.findManyByIds);
