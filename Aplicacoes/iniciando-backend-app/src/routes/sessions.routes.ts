import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const AuthenticateUser = new AuthenticateUserService();

  const { user, token } = await AuthenticateUser.execute({
    email,
    password,
  });

  /* A dois meses atrás Novembro de 2020 o Typescript não deixa mais usar delete em propriedades obrigratórias: https://pt.stackoverflow.com/questions/479147/the-operand-of-a-delete-operator-must-be-optional
    Porém o código abaixo foi antes disso, funciona mas o vscode reclama para resolver isso usei os comentários abaixo
    */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
