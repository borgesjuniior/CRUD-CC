import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../shared/errors/AppError';
import User from '../models/User';

class UserController {
  async index(req: Request, res: Response) {
    const results = await getRepository(User).find();

    if(results.length === 0) {
      return res.json({ message: 'Nothing to show'})
    }
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
        throw new AppError('Email already exists', 409);
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
      return res.status(error.statusCode).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email } = req.body;
      const repository = getRepository(User);
      const user = await repository.findOne({ id });
      const EmailUsed = await repository.findOne({ email })

      if(!user) {
        throw new AppError('User not found', 404);
      }

      if(EmailUsed) {
        throw new AppError('Email already used', 409)
      }

      await repository.update(id, req.body);
      const userUpdadted = await repository.findOne({ id });

      return res.json({ message: 'User updated', userUpdadted});
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = getRepository(User);
      const user = await repository.findOne({id});

      if(!user) {
        throw new AppError('User not found', 404);
      }

      await repository.delete({id});
      return res.json({ message: 'Delete user sucessfuly'});

    } catch (error) {
      res.status(error.statusCode).json(error);
    }
  }

}

export default new UserController;
