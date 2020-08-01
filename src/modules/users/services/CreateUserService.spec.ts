import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let usersRepository: FakeUsersRespository;
let hashProvider: FakeHashProvider;
let cacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRespository();
    hashProvider = new FakeHashProvider();
    cacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      usersRepository,
      hashProvider,
      cacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create users with same email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    await createUser.execute(userData);

    await expect(createUser.execute(userData)).rejects.toBeInstanceOf(AppError);
  });
});
