import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import multerConfig from '../config/upload';
import User from '../models/User';

interface Request {
  userId: string;
  fileName: string;
}

class UpdateAvatarService {
  public async execute({ userId, fileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const avatarFilePath = path.join(multerConfig.directory, user.avatar);

      const fileExists = await fs.promises.stat(avatarFilePath);

      if (fileExists) await fs.promises.unlink(avatarFilePath);
    }

    user.avatar = fileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
