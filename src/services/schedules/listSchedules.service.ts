import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { Schedule } from "../../entities/schedules_users_properties.entity";
import { AppError } from "../../errors/appError";

const listSchedulesService = async( id: string)  => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const scheduleRepository = AppDataSource.getRepository(Schedule);

  const foundProperty = await propertyRepository.findOneBy({
    id,
  });
  if (foundProperty === null){
    throw new AppError("Property not exists",404,);
  }

  const listschedules = await scheduleRepository.find({
    where: {
      property: {
        id
      },
    },
    relations: {
      user: true
    }
  });
  const socorro = {schedules: listschedules}
  return socorro;
}

export default listSchedulesService;