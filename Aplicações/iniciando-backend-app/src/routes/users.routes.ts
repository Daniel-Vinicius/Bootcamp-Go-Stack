import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    /* A dois meses atrás Novembro de 2020 o Typescript não deixa mais usar delete em propriedades obrigratórias: https://pt.stackoverflow.com/questions/479147/the-operand-of-a-delete-operator-must-be-optional
    Porém o código abaixo foi antes disso, funciona mas o vscode reclama para resolver isso usei os códigos abaixo
    */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
