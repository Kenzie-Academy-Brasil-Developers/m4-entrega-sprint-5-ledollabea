import AppDataSource from "../../data-source"
import { Property } from "../../entities/property.entity"

const listPropertiesService = async () => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const properties = propertyRepository.find();
  return properties;
}

export default listPropertiesService;