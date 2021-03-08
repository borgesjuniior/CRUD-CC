//Middleware que vai garantir que o token passado é válido

import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload{
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    //Validação do token JWT
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ message: 'JWT is missing'}); //Caso o token não seja encontrado
  }

  const [, token] = authHeader.split(' '); //Divide o token

  try {

    const decoded = verify(token, 'secret');
    const { id } = decoded as TokenPayload;

    req.userId = id;

    return next()
  } catch (error) {
    res.status(500).json(error);
  }
}
