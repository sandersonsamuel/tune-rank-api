import { Container } from "@/shared/container";
import { paramIdDto } from "@/shared/dtos/params.dto";
import { queryIdsDto } from "@/shared/dtos/query.dto";
import { authMiddleware } from "@/shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { Router } from "express";
import { TrackController } from "./track.controller";

export const trackRoutes = Router();

const trackController = Container.resolve<TrackController>("TrackController");

trackRoutes.get("/:id", authMiddleware, validateRequest(paramIdDto), trackController.findById);
trackRoutes.get("/", authMiddleware, validateRequest(queryIdsDto), trackController.findManyByIds);
