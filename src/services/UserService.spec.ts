import FakeUserService from './fakes/FakeUserService';
import AppError from '../shared/errors/AppError';

describe('Crud users', () => {

// Create

  it('should be able to create a new user', async () => {

    const fakeUserService = new FakeUserService;

    const user = await fakeUserService.create({
      name: 'Juníor',
      phone: '12345678',
      email: 'fulano2gmail.com',
      age: 17,
      ethnicity: 'pardo',
      weight: 71.4
    })

    expect(user).toHaveProperty('id');
  })

  it('Should not to be able to create a user with the same e-mail', async () => {
    const fakeUserService = new FakeUserService;

    await fakeUserService.create({
      name: 'Juníor',
      phone: '12345678',
      email: 'fulano1gmail.com',
      age: 17,
      ethnicity: 'pardo',
      weight: 71.4
    })

    expect(fakeUserService.create({
      name: 'Juníor',
      phone: '12345678',
      email: 'fulano1gmail.com',
      age: 17,
      ethnicity: 'pardo',
      weight: 71.4
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not to be able to create a user with the same e-mail', async () => {
    const fakeUserService = new FakeUserService;

    await fakeUserService.create({
      name: 'Juníor',
      phone: '12345678',
      email: 'fulano1gmail.com',
      age: 17,
      ethnicity: 'pardo',
      weight: 71.4
    })

    expect(fakeUserService.create({
      name: 'Juníor',
      phone: '12345678',
      email: 'fulano1gmail.com',
      age: 17,
      ethnicity: 'pardo',
      weight: 71.4
    })).rejects.toBeInstanceOf(AppError)
  })

// Update
  it('should not to be able to update a invalid user', async () => {
    const fakeUserService = new FakeUserService;

    expect(
      fakeUserService.update('nonValid', {
        name: 'Juníor',
        phone: '12345678',
        email: 'fulano1gmail.com',
        age: 17,
        ethnicity: 'pardo',
        weight: 71.4
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should to be able to update a user', async () => {

    const fakeUserService = new FakeUserService;

    const user = await fakeUserService.create({
      name: 'Juníor',
      phone: '12345678',
      email: 'fulano2gmail.com',
      age: 17,
      ethnicity: 'pardo',
      weight: 71.4
    })

    await fakeUserService.update(`${user.id}`, {
      name: 'Lívia',
      phone: '12345678',
      email: 'fulano1gmail.com',
      age: 17,
      ethnicity: 'pardo',
      weight: 71.4
    })

    expect(user).toHaveProperty('updated_at');

  })

  it('should not to be able to update a user with same e-mail', async () => {

    const fakeUserService = new FakeUserService;

    const user = await fakeUserService.create({
      name: 'Juníor',
      phone: '12345678',
      email: 'fulano2gmail.com',
      age: 17,
      ethnicity: 'pardo',
      weight: 71.4
    })

    expect(
      fakeUserService.update(`${user.id}`, {
        name: 'Lívia',
        phone: '12345678',
        email: 'fulano2gmail.com',
        age: 17,
        ethnicity: 'pardo',
        weight: 71.4
      })
    ).rejects.toBeInstanceOf(AppError);

  })

//delete

})
