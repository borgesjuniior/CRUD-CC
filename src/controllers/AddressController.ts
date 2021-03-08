import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Address from '../models/Address';

class AddressController {
  async index(req: Request, res: Response) {
    const results = await getRepository(Address).find();
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
      console.log(error)
      res.send(500)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params

      const repository = getRepository(Address);
      const addressUpdated = await repository.update(id, req.body);

      return res.status(200).json(addressUpdated);
    } catch (error) {
      console.log('error')
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = getRepository(Address);
      const address = await repository.findOne({id});

      if(!address) {
        return res.status(404).json({ message: 'Address do not exists' });
      }

      await repository.delete({id});
      return res.json({ message: 'Delete address sucessfuly'});
    } catch (error) {
      res.status(500).json({error});
    }
  }

}

export default new AddressController;
