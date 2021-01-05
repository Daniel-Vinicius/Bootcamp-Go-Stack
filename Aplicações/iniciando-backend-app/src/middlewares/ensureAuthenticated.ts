import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  /* Isso é bem legal no Typescript/Javascript quando você tem uma variável e que separar ela você usa o split com espaço
  e pega só a parte que você vai usar. Como você pode notar abaixo eu não vou usar o a primeira parte de authHeader
  e para não criar uma variável que não vou usar eu só coloco uma vírgula */
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    // Neste Console Log ele Retorna o Token Decodificado console.log(decoded);

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
