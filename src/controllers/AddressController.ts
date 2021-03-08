import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../shared/errors/AppError';
import Address from '../models/Address';

class AddressController {
  async index(req: Request, res: Response) {
    const results = await getRepository(Address).find();
    if (results.length === 0) {
      return res.json({ message: 'Nothing to show'});
    }

    return res.json(results);
  }

  async create(req: Request, res: Response) {
    try {
      const {
        user_id,
        address,
        number,
        complement,
        cep,
        city,
        estate
      } = req.body;

      const repository = getRepository(Address);

      const adressInfo = repository.create({
        user_id,
        address,
        number,
        complement,
        cep,
        city,
        estate
      })

      await repository.save(adressInfo);

      return res.json(adressInfo);

    } catch (error) {
      res.status(500).json({error: 'Enter a valid user id'})
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const repository = getRepository(Address);
      const address = await repository.findOne({ id });

      if(!address) {
        throw new AppError('Adress does not exists', 404)
      }

      const addressUpdated = await repository.update(id, req.body);
      return res.status(200).json({message: 'Address has been updated', addressUpdated});

    } catch (error) {
      res.status(error.statusCode).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = getRepository(Address);
      const address = await repository.findOne({id});

      if(!address) {
        throw new AppError('Address not found', 404);
      }

      await repository.delete({id});
      return res.json({ message: 'Delete address sucessfuly'});
    } catch (error) {
      res.status(error.statusCode).json(error);
    }
  }

}

export default new AddressController;
