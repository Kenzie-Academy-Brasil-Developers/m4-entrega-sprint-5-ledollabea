import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (id: string): Promise<string> =>{
    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOneBy({
    id
    })
    if (foundUser===null){
      throw new AppError("User not found!",404);
    }
    if (foundUser.isActive===false){
      throw new AppError("User  not active",400);
    }
    await userRepository.update(
      id, 
      {
       isActive: false
      })
    return "User deleted successfully";
}


export default deleteUserService;