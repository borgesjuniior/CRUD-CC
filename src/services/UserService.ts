import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../shared/errors/AppError';

interface UserProps {
  name: string;
  phone: string;
  email: string;
  age: number;
  weight: number;
  ethnicity: string;
}

class UserService {
  async create(userProps: UserProps ) {
    const repository = getRepository(User);
    const userAlreadyExists = await repository.findOne({ email: userProps.email});

    if(!userProps.email) {
      throw new AppError('User must have a e-mail');
    }

    if(userAlreadyExists) {
      throw new AppError('Email already exists', 409);
    }


    const user = repository.create(userProps);

    await repository.save(user);

    return user;
  }

  async update(id: string, userProps: UserProps): Promise<User> {
    const repository = getRepository(User);
    const user = await repository.findOne({ id });
    const EmailUsed = await repository.findOne({ email: userProps.email })

    if(!user) {
      throw new AppError('User not found', 404);
    }

    if(EmailUsed) {
      throw new AppError('Email already used', 409)
    }

    await repository.update(id, userProps);
    const userUpdadted = await repository.findOne({ id });

    return userUpdadted as User;
  }

  async delete(id: string) {
    const repository = getRepository(User);
    const user = await repository.findOne({ id });

    if(!user) {
      throw new AppError('User not found, enter a valid id', 404);
    }

    await repository.delete({id});
  }
}

export default new UserService;
