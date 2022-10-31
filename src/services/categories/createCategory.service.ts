import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const existingCategory = await categoryRepository.findOneBy({
    name: name,
  });
  if (existingCategory) {
    throw new AppError("Category already exists", 400);
  }
  const newCategory = categoryRepository.create({
    name,
  });
  await categoryRepository.save(newCategory);

  return newCategory;
};

export default createCategoryService;
