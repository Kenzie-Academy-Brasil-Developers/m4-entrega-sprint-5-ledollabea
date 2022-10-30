import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import { instanceToPlain } from "class-transformer";

const createUserController =  async (request: Request, response: Response) => {
    const user = request.body;
    const createdUser = await createUserService(user);
    response.status(201).json(instanceToPlain(createdUser));   
}

const listUsersController = async (request: Request, response: Response) => {
  const users = await listUsersService();
  return response.json(users);
}


const updateUserController = async (request: Request, response: Response) => {
  const {id} = request.params;
  const user = request.user;
  const update = request.body;

  const updatedUser = await updateUserService(id, user, update);
  return response.status(200).json(updatedUser);
}

const deleteUserController = async (request: Request, response: Response) => {
    const {id} = request.params;
    const deletedUser = await deleteUserService(id);
    return response.status(204).send(deletedUser);
}



export { createUserController, listUsersController, updateUserController, deleteUserController };