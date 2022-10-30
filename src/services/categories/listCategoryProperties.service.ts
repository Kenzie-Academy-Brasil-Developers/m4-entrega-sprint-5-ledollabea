import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError";

const listCategoryPropertiesService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  
  const foundCategory = await categoryRepository.findBy({id});
  if (foundCategory===null){
    throw new AppError(409, "Category not exists");
  }
  const propertiesPerCategory = await categoryRepository.findOne({
    where: {
      id
    },
    relations: {
      properties: true
    }
  })
  if (propertiesPerCategory === null){
    throw new AppError(404, "No property found");
  }
  return propertiesPerCategory;
}

export default listCategoryPropertiesService;