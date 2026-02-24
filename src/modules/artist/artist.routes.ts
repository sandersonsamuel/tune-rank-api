import { Router } from "express";
import { Container } from "../../shared/container";
import { ArtistController } from "./artist.controller";

export const artistRoutes = Router();

const artistController = Container.resolve<ArtistController>("ArtistController");

artistRoutes.get("/:id/top-tracks", artistController.findTopTracks);
artistRoutes.get("/:id/albums", artistController.findAlbums);
artistRoutes.get("/:id", artistController.findById);

