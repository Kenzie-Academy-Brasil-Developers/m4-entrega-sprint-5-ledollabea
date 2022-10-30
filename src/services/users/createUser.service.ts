import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const createUserService = async ({name, email, isAdm, password}: IUserRequest): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User);
    if (!password){
        throw new AppError(400,"Password is needed");
    }
    const existingUser = await userRepository.findOneBy({
        email: email
    });
    if (existingUser !== null){
        throw new AppError(400,"Email already exists");
    }
    const passHashed = await hash(password, 10);
    const user = {
        name,
        email,
        isAdm,
        password: passHashed,
    };
    const newUser = userRepository.create(user);
    
    await userRepository.save(newUser);

    const returnUser = {
        name: newUser.name,
        email: newUser.email,
        id: newUser.id,
        isAdm: newUser.isAdm,
        isActive: newUser.isActive,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
    }

    return returnUser;
}

export default createUserService;