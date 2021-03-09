import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import Address from '../models/Address';
import User from '../models/User';
import AppError from '../shared/errors/AppError';

class AddressService {
  async create({
    user_id,
    address,
    number,
    complement,
    cep,
    city,
    estate
  }: any): Promise<Address> {
  const userrepo = getRepository(User);
  const user = await userrepo.find({ id: user_id});

  if(user.length === 0) {
    throw new AppError('Enter a valid user Id')
  }

  const repository = getRepository(Address);
  const addressInfo = repository.create({
    user_id,
    address,
    number,
    complement,
    cep,
    city,
    estate
  })

  await repository.save(addressInfo);
  return addressInfo;
  }

  async update(id: string, addresProps: any): Promise<UpdateResult> {
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
