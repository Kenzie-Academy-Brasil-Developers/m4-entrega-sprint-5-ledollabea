import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createScheduleService from "../services/schedules/createSchedule.service";
import listSchedulesService from "../services/schedules/listSchedules.service";

const createScheduleController = async (request: Request, response: Response) => {
  const {id} = request.user;
  const schedule = request.body;
  const createdSchedule = await createScheduleService(id, schedule);
  return response.status(201).json(instanceToPlain({message:createdSchedule}));
};


const listSchedulesController = async (request: Request, response: Response) => {
  const {id} = request.params;
  const listedSchedules = await listSchedulesService(id);
  return response.json(listedSchedules);
}

export {createScheduleController, listSchedulesController};