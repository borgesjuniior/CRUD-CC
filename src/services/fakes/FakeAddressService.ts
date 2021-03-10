import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { uuid } from 'uuidv4';
import Address from '../../models/Address';
import AppError from '../../shared/errors/AppError';

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
  private address: Address[] = [];

  async create(addressProps: AddressProps): Promise<Address> {

  const addressInfo = new Address;

  addressInfo.id = uuid() ,
  addressInfo.user_id = addressProps.user_id,
  addressInfo.address = addressProps.address,
  addressInfo.number = addressProps.number,
  addressInfo.complement = addressProps.complement,
  addressInfo.cep = addressProps.cep,
  addressInfo.city = addressProps.city,
  addressInfo.estate = addressProps.estate

  this.address.push(addressInfo);


  return addressInfo;
  }

  async update(id: string, addressProps: AddressProps): Promise<Address> {
    const address = this.address.find(address => address.id === id);

    if(!address) {
      throw new AppError('Adress does not exists', 404)
    }

    const addressInfo = new Address;

    addressInfo.id = uuid(),
    addressInfo.user_id = addressProps.user_id,
    addressInfo.address = addressProps.address,
    addressInfo.number = addressProps.number,
    addressInfo.complement = addressProps.complement,
    addressInfo.cep = addressProps.cep,
    addressInfo.city = addressProps.city,
    addressInfo.estate = addressProps.estate,
    addressInfo.created_at = new Date(),
    addressInfo.updated_at = new Date()

    this.address.push(addressInfo);

    return addressInfo;

  }

  async delete(id: string) {
    const address = this.address.find(address => address.id === id);

    if(!address) {
      throw new AppError('Address not found', 404);
    }

    const addressIndex = this.address.findIndex(address => address.id === id);
    this.address.splice(addressIndex, 1);

    return this.address;

  }
}

export default AddressService;
