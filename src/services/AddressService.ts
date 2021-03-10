import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import Address from '../models/Address';
import User from '../models/User';
import AppError from '../shared/errors/AppError';

interface AddressProps {
  user_id: string;
  address: string;
  number: number;
  complement: string;
  cep: string;
  city: string;
  estate: string;

}

class AddressService {
  async create(addresProps: AddressProps): Promise<Address> {
  const userRepository= getRepository(User);
  const user = await userRepository.findOne(addresProps.user_id);

  if(!user) {
    throw new AppError('Enter a valid user Id')
  }

  const repository = getRepository(Address);
  const addressInfo = repository.create(addresProps)

  await repository.save(addressInfo);
  return addressInfo;

  }

  async update(id: string, addresProps: AddressProps): Promise<UpdateResult> {
    const repository = getRepository(Address);
    const address = await repository.findOne({ id });

    if(!address) {
      throw new AppError('Adress does not exists', 404)
    }

    const addressUpdated = await repository.update(id, addresProps);

    return addressUpdated;

  }

  async delete(id: string): Promise<DeleteResult> {
    const repository = getRepository(Address);
    const address = await repository.findOne({ id });

    if(!address) {
      throw new AppError('Address not found', 404);
    }

    const result = await repository.delete({id});

    return result;

  }
}

export default new AddressService;
