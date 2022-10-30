import { Request, Response, NextFunction } from "express";

const isAdmMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  if (request.user.isAdm ===false){
    return response.status(403).json({message: "Unauthorized User"});
  }
  return next();
}

export default isAdmMiddleware;