import { Router } from "express";
import { createCategoryController, listCategoryPropertiesController, retrieveCategoriesController } from "../controllers/categories.controllers";
import authMiddleware from "../middlewares/verifyAuth.middleware";
import isAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post("", authMiddleware, isAdmMiddleware, createCategoryController);
categoriesRoutes.get("", retrieveCategoriesController);
categoriesRoutes.get("/:id/properties", listCategoryPropertiesController);

export default categoriesRoutes;