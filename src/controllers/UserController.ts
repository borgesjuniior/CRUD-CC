import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController {
  async index(req: Request, res: Response) {
    const results = await getRepository(User).find();
    return res.json(results);
  }

  async create(req: Request, res: Response) {
    try {
      const {
        name,
        phone,
        email,
        age,
        weight,
        ethnicity
      } = req.body;

      const repository = getRepository(User);
      const userAlreadyExists = await repository.findOne({email});

      if(userAlreadyExists) {
        return res.status(409).json({message: 'Email already exists'});
      }


      const user = repository.create({
        name,
        phone,
        email,
        age,
        weight,
        ethnicity
      })

      await repository.save(user);

      return res.json(user);

    } catch (error) {
      console.log(error)
      res.send(500)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params

      const repository = getRepository(User);
      const userUpdated = await repository.update(id, req.body);

      return res.status(200).json(userUpdated);
    } catch (error) {
      console.log('error')
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = getRepository(User);
      const user = await repository.findOne({id});

      if(!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await repository.delete({id});
      return res.json({ message: 'Delete user sucessfuly'});
    } catch (error) {
      res.status(500).json({error});
    }
  }

}

export default new UserController;
