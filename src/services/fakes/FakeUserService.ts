import User from '../../models/User';
import AppError from '../../shared/errors/AppError';
import { uuid } from 'uuidv4';

interface UserProps {
  name: string;
  phone: string;
  email: string;
  age: number;
  weight: number;
  ethnicity: string;
}

class UserService {
  private Users: User[] = [];

  async create(userProps: UserProps ) {
    const userAlreadyExists = this.Users.find(user => user.email === userProps.email);

    if(!userProps.email) {
      throw new AppError('User must have a e-mail');
    }

    if(userAlreadyExists) {
      throw new AppError('Email already exists', 409);
    }

    const user = new User;
    user.id = uuid()
    user.name = userProps.name,
    user.email = userProps.email,
    user.phone = userProps.phone,
    user.age = userProps.age,
    user.weight = userProps.weight,
    // user.created_at = new Date(),
    // user.updated_at = new Date()

    this.Users.push(user);

    return user;
  }

  async update(id: string, userProps: UserProps): Promise<User> {
    const userExists = this.Users.find(user => user.id === id);
    const EmailUsed = this.Users.find(user => user.email === userProps.email);

    if(!userExists) {
      throw new AppError('User not found', 404);
    }

    if(EmailUsed) {
      throw new AppError('Email already used', 409)
    }

    const user = new User;
    user.name = userProps.name,
    user.email = userProps.email,
    user.phone = userProps.phone,
    user.age = userProps.age,
    user.weight = userProps.weight,
    user.created_at = new Date(),
    user.updated_at = new Date()

    this.Users.push(user);

    return user;
  }

  async delete(id: string) {
    const user = this.Users.find(user => user.id === id);

    if(!user) {
      throw new AppError('User not found, enter a valid id', 404);
    }

    const userIndex = this.Users.findIndex(user => user.id === id);

    this.Users.splice(userIndex, 1);


    return this.Users; //Como só há um registro o array retornará vazio


  }
}

export default UserService;
