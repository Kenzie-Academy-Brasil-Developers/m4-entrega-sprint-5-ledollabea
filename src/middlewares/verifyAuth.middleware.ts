import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  let token = request.headers.authorization;

  if (!token) {
    return response
      .status(401)
      .json({ message: "Missing Authorization Token." });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return response.status(403).json({ message: "Invalid Token." });
    }

    request.user = {
      id: decoded.id,
      isAdm: decoded.isAdm,
      isActive: decoded.isActive
    }
    
    return next();
  });

}

export default authMiddleware;