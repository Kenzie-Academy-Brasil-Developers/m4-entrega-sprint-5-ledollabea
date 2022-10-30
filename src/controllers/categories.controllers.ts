import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoryPropertiesService from "../services/categories/listCategoryProperties.service";
import retrieveCategoriesService from "../services/categories/retrieveCategories.service";
import { instanceToPlain } from "class-transformer";

const createCategoryController = async (request: Request, response: Response) => {
  const category = request.body;
  const createdCategory = await createCategoryService(category);
  return response.status(201).json(instanceToPlain(createdCategory));
}

const listCategoryPropertiesController = async (request: Request, response: Response) => {
  const {id} = request.params;
  const categories = await listCategoryPropertiesService(id);
  return response.json(instanceToPlain(categories));
}

const retrieveCategoriesController = async (request: Request, response: Response) => {
  const categories = await retrieveCategoriesService();
  return response.json(categories);
}

export { createCategoryController, listCategoryPropertiesController, retrieveCategoriesController };