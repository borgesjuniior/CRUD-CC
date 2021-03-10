import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Address from '../models/Address';
import AddressService from '../services/AddressService';

class AddressController {
  async index(req: Request, res: Response) {
    const results = await getRepository(Address).find();

    if (results.length === 0) {
      return res.json({ message: 'Nothing to show'});
    }

    return res.json(results);
  }

  async create(req: Request, res: Response) {
    const {
      user_id,
      address,
      number,
      complement,
      cep,
      city,
      estate
    } = req.body;

    const addressInfo = await AddressService.create({
      user_id,
      address,
      number,
      complement,
      cep,
      city,
      estate
    })

    return res.json(addressInfo);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const address = await AddressService.update(id, req.body)

    return res.json({
      message: 'Address Updated',
      address
    }) ;
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const result = await AddressService.delete(id);

    return res.json({
      message: 'Delete address sucessfuly',
      result
    });
  }

}

export default new AddressController;
