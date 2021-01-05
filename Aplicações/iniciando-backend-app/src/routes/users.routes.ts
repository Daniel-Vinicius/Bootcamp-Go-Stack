import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
// Atribuo a Variável upload uma chamada da função multer passando minhas configurações
const upload = multer(uploadConfig);

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
    Porém o código abaixo foi antes disso, funciona mas o vscode reclama para resolver isso usei os comentários abaixo
    */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  /* Coloco o Middleware upload na rota dizendo que o upload será de 1 arquivo e com o nome do campo no Insomnia avatar,
 caso fosse de mais de 1 arquivo diria que era upload.array e não single, o nome do campo não é o do banco e sim o da requisição. */
  upload.single('avatar'),
  async (request, response) => {
    // console.log(request.file); esse console.log mostra todas as informações do arquivo enviado
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      /* A dois meses atrás Novembro de 2020 o Typescript não deixa mais usar delete em propriedades obrigratórias: https://pt.stackoverflow.com/questions/479147/the-operand-of-a-delete-operator-must-be-optional
    Porém o código abaixo foi antes disso, funciona mas o vscode reclama para resolver isso usei os comentários abaixo
    */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default usersRouter;
