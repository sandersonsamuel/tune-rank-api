import { Container } from "@/shared/container";
import { authMiddleware } from "@/shared/middlewares/jwt-handler.middleware";
import { Router } from "express";
import { ArtistController } from "./artist.controller";

export const artistRoutes = Router();

const artistController = Container.resolve<ArtistController>("ArtistController");

artistRoutes.get("/:id", authMiddleware, artistController.findById);
