import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({ value, size, address, categoryId }:IPropertyRequest): Promise<Property> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const propertyRepository = AppDataSource.getRepository(Property);
  const categoryRepository = AppDataSource.getRepository(Category);

  const existingProperty = await propertyRepository.findOneBy({
    size: size,
    value: value,
    address: address
  })

  if (existingProperty === null) {
    throw new AppError(404, "Property does not exist");
  }
  const existingCategory = await categoryRepository.findOneBy({
    id: categoryId
  })

  if (existingCategory === null){
    throw new AppError(404, "Category does not exist");
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