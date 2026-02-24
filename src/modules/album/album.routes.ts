import { Router } from "express";
import { Container } from "../../shared/container";
import { paramIdDto } from "../../shared/dtos/params.dto";
import { queryIdsDto } from "../../shared/dtos/query.dto";
import { validateRequest } from "../../shared/middlewares/validation-request.middleware";
import { AlbumController } from "./album.controller";

export const albumRoutes = Router();

const albumController = Container.resolve<AlbumController>("AlbumController");

albumRoutes.get("/:id", validateRequest(paramIdDto), albumController.findById);
albumRoutes.get("/", validateRequest(queryIdsDto), albumController.findManyByIds);
