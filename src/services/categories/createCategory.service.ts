import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async({name}: ICategoryRequest): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const existingCategory = await categoryRepository.findOneBy({
    name: name
  });
  if (existingCategory!==null){
    throw new AppError(409, "Category already exists");
  }
  const newCategory = await categoryRepository.create({
    name
  });
  await categoryRepository.save(newCategory);

  return newCategory;
}

export default createCategoryService;