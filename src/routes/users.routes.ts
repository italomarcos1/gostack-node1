import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multerConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(multerConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatar = new UpdateAvatarService();

    const user = await updateAvatar.execute({
      userId: request.user.id,
      fileName: request.file.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
