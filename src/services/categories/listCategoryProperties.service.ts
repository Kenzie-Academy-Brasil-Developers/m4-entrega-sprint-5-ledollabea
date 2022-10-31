import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError";

const listCategoryPropertiesService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  
  const foundCategory = await categoryRepository.findBy({
    id: id
  });

  if (foundCategory===null){
    throw new AppError( "Category not exists", 409);
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
    throw new AppError("No property found",404);
  }
  return propertiesPerCategory;
}

export default listCategoryPropertiesService;