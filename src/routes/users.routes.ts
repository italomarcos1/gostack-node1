import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const { id, created_at } = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json({ id, name, email, created_at });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
