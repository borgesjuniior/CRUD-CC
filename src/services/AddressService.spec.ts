import AppError from '../shared/errors/AppError';
import FakeAddressService from './fakes/FakeAddressService';

describe('Crud Address', () => {
  it('should be able to create a new address', async () => {

    const fakeAddressService = new FakeAddressService;

    const address = await fakeAddressService.create({
      user_id: 'uuid',
      address: 'Rua Coelho Neto',
      number: 74,
      complement: 'Ao lado do porto',
      cep: '65290-000',
      city: 'Carutapera',
      estate: 'MA'
    })

    expect(address).toHaveProperty('id');
  })

  it('should not to be able to update a invalid address id', async () => {
    const fakeAddressService = new FakeAddressService;

    expect(
      fakeAddressService.update('nonValid', {
        user_id: 'uuid',
        address: 'Rua Perpétuo Socorro',
        number: 74,
        complement: 'Prox praa',
        cep: '65290-000',
        city: 'Carutapera',
        estate: 'MA'
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not to be able to update a invalid address id', async () => {
    const fakeAddressService = new FakeAddressService;

    expect(
      fakeAddressService.update('nonValid', {
        user_id: 'uuid',
        address: 'Rua Perpétuo Socorro',
        number: 74,
        complement: 'Prox praa',
        cep: '65290-000',
        city: 'Carutapera',
        estate: 'MA'
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should to be able to update a address', async () => {

    const fakeAddressService = new FakeAddressService;

    const address = await fakeAddressService.create({
      user_id: 'uuid',
      address: 'Rua Coelho Neto',
      number: 74,
      complement: 'Ao lado do porto',
      cep: '65290-000',
      city: 'Carutapera',
      estate: 'MA'
    })

    const addressUpdated = await fakeAddressService.update(`${address.id}`, {
      user_id: 'uuid',
      address: 'Rua dois',
      number: 75,
      complement: 'Docas',
      cep: '65290-000',
      city: 'Ludo',
      estate: 'MA'
    })

    expect(addressUpdated).toHaveProperty('updated_at');

  })

  it('should be able to delete a address', async () => {

    const fakeAddressService = new FakeAddressService;

    const address = await fakeAddressService.create({
      user_id: 'uuid',
      address: 'Rua Coelho Neto',
      number: 74,
      complement: 'Ao lado do porto',
      cep: '65290-000',
      city: 'Carutapera',
      estate: 'MA'
    })

    expect(
      fakeAddressService.delete(`${address.id}`)
    ).resolves.toBeTruthy() //must return []

  })

  it('should not to be able to delete a nonexistent address', async () => {

    const fakeAddressService = new FakeAddressService;
    expect(
      fakeAddressService.delete('nonValid')
    ).rejects.toBeInstanceOf(AppError);

  })

  })
