import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { Schedule } from "../../entities/schedules_users_properties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const createScheduleService = async (id: string, {date, hour, property}: Schedule): Promise<string> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const userRepository = AppDataSource.getRepository(User);
  const propertyRepository = AppDataSource.getRepository(Property);

  const desiredProperty = await propertyRepository.findOneBy({
    id: property.id
  })

  const potentialClient = await userRepository.findOneBy({
    id: id
  })

  const alreadyScheduled = await scheduleRepository.find({
    where: {
      property: {
        id: property.id
      },
    },
    relations: {
      user: true,
    }
  });

  if (alreadyScheduled !== null){
    throw new AppError(400, "Schedule already exists");
  }
  if (desiredProperty === null){
    throw new AppError(404,"Property not found");
  }
  if (potentialClient === null){
    throw new AppError(404,"Client not found");
  }

  const dateOfAppointment = new Date(date);
  const isWeekday = dateOfAppointment.getUTCDay();

  if (isWeekday === 0 || isWeekday === 6){
    throw new AppError(400, "Appointments can only be made on weekdays");
  }
  
  const workingHours = hour.split(":");
  if (Number(workingHours) < 8 || Number(workingHours) >= 18){
    throw new AppError(400, "Appointments can only be made from 8h to 17h");
  } 

  const existingSchedule = await scheduleRepository.findOne({
    relations: {
      property: true,
    },
    where: {
      date,
      hour,
    },
  });

  if (existingSchedule !== null){
    throw new AppError(400, "This time is already alocated");
  }

  const newSchedule = {
    date,
    hour,
    property: desiredProperty,
    user: potentialClient
  }

  const saveSchedule = await scheduleRepository.create(newSchedule);
  await scheduleRepository.save(newSchedule);
  return "Schedule created successfully";
}

export default createScheduleService;