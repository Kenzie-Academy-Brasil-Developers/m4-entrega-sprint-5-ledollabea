import { Router } from "express";
import { createScheduleController, listSchedulesController } from "../controllers/schedules.controllers";
import authMiddleware from "../middlewares/verifyAuth.middleware";
import isAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const schedulesRouter = Router();

schedulesRouter.post("", authMiddleware, createScheduleController);
schedulesRouter.get("/properties/:id", authMiddleware, isAdmMiddleware, listSchedulesController);

export default schedulesRouter;