import { Request, Response } from "express";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (request: Request, response: Response) =>{
    const login = request.body;
    const token = await createSessionService(login);
    return response.json({token});
}

export { createSessionController };