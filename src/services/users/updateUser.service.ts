import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import {  IUser, IUserDecoded, IUserUpdate } from "../../interfaces/users";

const updateUserService = async (id: string, user: IUserDecoded, update: IUserUpdate):Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id: id
  })
  if (findUser === null){
    throw new AppError(404,"User not found!")
  }
  if (user.isAdm===false){
      throw new AppError(401,"Unauthorized User");
  } 
  
  if(update.id !== undefined){
    throw new AppError(401,"Cannot Change property id");
  }
  if(update.isActive !== undefined){
    throw new AppError(401,"Cannot Change property isActive");
  }
  if(update.isAdm !== undefined){
    throw new AppError(401,"Cannot Change property isAdm");
  }

  const {name, email, password} = update;
  await userRepository.update(
    id, 
    {
      name: name ? name : findUser!.name,
      email: email ? email : findUser!.email,
      password: password ? await hash(password, 10) : findUser!.password
    })
  
    const updatedUser = await userRepository.findOneBy({
      id: id
    })
    
    const returnUser = {
      name: updatedUser!.name,
      email: updatedUser!.email,
      id: updatedUser!.id,
      isAdm: updatedUser!.isAdm,
      isActive: updatedUser!.isActive,
      createdAt: updatedUser!.createdAt,
      updatedAt: updatedUser!.updatedAt
  }

    return returnUser;
}

export default updateUserService;