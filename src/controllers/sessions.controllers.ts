import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (request: Request, response: Response) =>{
    const login:IUserLogin = request.body;
    const token = await createSessionService(login);
    return response.json({token});
}

export { createSessionController };