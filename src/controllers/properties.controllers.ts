import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createPropertyService from "../services/properties/createProperty.service";
import listPropertiesService from "../services/properties/listProperties.service";

const createPropertyController = async (request: Request, response: Response) => {
  const property = request.body;
  const createdProperty = await createPropertyService(property);
  return response.status(201).json(instanceToPlain(createdProperty));
}

const listPropertiesController = async (request: Request, response: Response) => {
  const listedProperties = await listPropertiesService();
  return response.json(instanceToPlain(listedProperties)).send();
}

export {createPropertyController, listPropertiesController};