import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import {  IUserDecoded, IUserUpdate } from "../../interfaces/users";

const updateUserService = async (id: string, user: IUserDecoded, update: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id
  })
  if (findUser === null){
    throw new AppError("User not found!",404)
  }

  const {name, email, password} = update;
  await userRepository.update(
    id, 
    {
      name: name ? name : findUser.name,
      email: email ? email : findUser.email,
      password: password ? await hash(password, 10) : findUser.password
    })
  
    const updatedUser = await userRepository.findOneBy({
      id
    })
    console.log(updatedUser);

    const thisUser = {
      name: updatedUser?.name,
      email:updatedUser?.email,
      id: updatedUser?.id,
      isAdm: updatedUser?.isAdm,
      isActive: updatedUser?.isActive,
      createdAt: updatedUser?.createdAt,
      updatedAt: updatedUser?.updatedAt

    }
    return updatedUser;
}

export default updateUserService;