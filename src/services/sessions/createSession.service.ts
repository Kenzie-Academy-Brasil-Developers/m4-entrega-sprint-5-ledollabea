import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../../errors/appError";

const createSessionService = async ({email, password}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: email
  })
  if (user === null){
    throw new AppError("Invalid Email or Password!",403);
  }
  const userPassword = await compare(password, user.password);
  if(userPassword === false){
    throw new AppError("Invalid Email or Password!",403);
  }

  const token = jwt.sign(
    {
      email: user.email,
      name: user.name, 
      isAdm: user.isAdm,
      id: user.id
    }, 
    process.env.SECRET_KEY as string, 
    {
      expiresIn: "24h", 
      subject: user.id
    });

  return token;
}

export default createSessionService;