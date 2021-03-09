import { json, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import UserService from '../services/UserService';

class UserController {
  async index(req: Request, res: Response) {
    const results = await getRepository(User).find();

    if(results.length === 0) {
      return res.json({ message: 'Nothing to show'})
    }
    return res.json(results);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      phone,
      email,
      age,
      weight,
      ethnicity
    } = req.body;

    const user = await UserService.create({
      name,
      phone,
      email,
      age,
      weight,
      ethnicity
    })


    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const user = await UserService.update(id, req.body);

    return res.json({
      message: 'UserUpdated',
      user
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await UserService.delete(id);

    res.json({ message: 'User deleted'})
  }

}

export default new UserController;
