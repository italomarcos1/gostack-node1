import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('name');
    expect(user.email).toBe('email@email.com');
  });

  it('should not be able to register with an already taken email address', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    await expect(
      createUserService.execute({
        name: 'another name',
        email: 'email@email.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
