import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

class AuthController {
  async execute(req: Request, res: Response) {
    const respository = getRepository(User);
    const { email } = req.body;
    const user = await respository.findOne({ email });

    if (!user) {
      return res.json({message: 'Enter a valid e-mail'});
    }

    const token = sign({}, 'secret', {
      expiresIn: '1d',
    })

    return res.json({
      user,
      token
    })

  }
}

export default new AuthController;
