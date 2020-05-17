import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const sessionsRepository = getRepository(User);

    const user = await sessionsRepository.findOne({ where: { email } });

    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new AppError('Incorrect email/password combination', 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ id: user.id }, secret, { expiresIn });

    return { user, token };
  }
}

export default AuthenticateUserService;
