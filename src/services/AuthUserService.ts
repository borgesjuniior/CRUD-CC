import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../shared/errors/AppError';

class AuthUserService {
  async authUser(email: string): Promise<{ user: User, token: string}> {
    const respository = getRepository(User);
    const user = await respository.findOne({ email });

    if (!user) {
      throw new AppError('Enter a valid email', 404);
    }

    const token = sign({}, 'secret', {
      expiresIn: '1d',
    })

    return {
      user,
      token
    }

  }
}

export default new AuthUserService;
