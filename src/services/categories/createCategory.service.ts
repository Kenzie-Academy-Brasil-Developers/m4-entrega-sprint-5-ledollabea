import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const createCategoryService = async(name: string): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const existingCategory = categoryRepository.findOneBy({
    name: name
  });
  if (existingCategory!==null){
    throw new AppError(409, "Category already exists");
  }
  const newCategory = categoryRepository.create({name});
  await categoryRepository.save(newCategory);

  return newCategory;
}

export default createCategoryService;