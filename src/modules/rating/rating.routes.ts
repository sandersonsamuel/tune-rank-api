import { Router } from "express";
import { Container } from "@/shared/container";
import { RatingController } from "./rating.controller";
import { authMiddleware } from "@/shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { CreateRatingRequest, GetRatingsByUserIdRequest } from "./rating.schema";
import { paramIdDto } from "@/shared/dtos/params.dto";

export const ratingRoutes = Router();

const ratingController = Container.resolve<RatingController>("RatingController");

ratingRoutes.post("/create", authMiddleware, validateRequest(CreateRatingRequest), ratingController.create);
ratingRoutes.get("/user", authMiddleware, validateRequest(GetRatingsByUserIdRequest), ratingController.getRatingsByUserId);
ratingRoutes.get("/release/:id", authMiddleware, validateRequest(paramIdDto), ratingController.getRatingByReleaseId);

