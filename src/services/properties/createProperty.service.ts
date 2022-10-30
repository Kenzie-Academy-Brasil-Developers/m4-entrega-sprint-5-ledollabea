import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError";

const createPropertyService = async ({ value, size, address, category }:Property): Promise<Property> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const propertyRepository = AppDataSource.getRepository(Property);
  const categoryRepository = AppDataSource.getRepository(Category);

  const { id } = address;
  const existingProperty = addressRepository.findOneBy({
    id: id
  });

  if (existingProperty!== null){
    throw new AppError(400, "Property already exists")
  }

  const categoryId = category.id;

  const existingCategory = await categoryRepository.findOneBy({
    id: categoryId
  })

  if (existingCategory === null){
    throw new AppError(404, "Category not exists");
  }

  if(address.state.length > 2){
    throw new AppError(400, "State must come in UF format");
  }
  if(address.zipCode.length > 8){
    throw new AppError(400, "ZipCode must come with 8 digits, only numbers");
  }

  const createAddress = {
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state
  }
  const newAddress = addressRepository.create(createAddress);

  await addressRepository.save(newAddress);

  const foundAddress = await addressRepository.findOneBy({
    id: newAddress.id
  })

  const property = {
    value, 
    size, 
    address: foundAddress!, 
    category: existingCategory!
  }
  const newProperty = propertyRepository.create(property);
  await propertyRepository.save(newProperty);

  return newProperty;
}

export default createPropertyService;