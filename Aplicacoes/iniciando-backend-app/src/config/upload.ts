import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  // Directory serve para você saber depois onde estão os arquivos
  directory: tmpFolder,
  storage: multer.diskStorage({
    // Destination você passa onde será salvo o arquivo
    destination: tmpFolder,
    // Filename Recebe 3 Parametros e Basicamente serve para dizer qual será o nome do arquivo inserido, o primeiro parametro de callback serve para dizer o que acontece se houver um erro
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
