import { Router } from "express";
import { createPropertyController, listPropertiesController } from "../controllers/properties.controllers";
import authMiddleware from "../middlewares/verifyAuth.middleware";
import isAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post("",authMiddleware, isAdmMiddleware, createPropertyController);
propertiesRoutes.get("", listPropertiesController);

export default propertiesRoutes;