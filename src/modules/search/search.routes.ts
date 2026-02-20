import { Container } from "../../shared/container";
import { authMiddleware } from "../../shared/middlewares/jwt-handler.middleware";
import { Router } from "express";
import { SearchController } from "./search.controller";
import { SearchSchema } from "./search.schema";
import { validateRequest } from "../../shared/middlewares/validation-request.middleware";
import { QueryTypedDto } from "../../shared/dtos/request.dto";

export const searchRoutes = Router();

const searchController = Container.resolve<SearchController>("SearchController");

searchRoutes.get("/", authMiddleware, validateRequest(QueryTypedDto(SearchSchema)), searchController.search);
