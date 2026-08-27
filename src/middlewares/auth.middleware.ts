import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../utils/jwt';

export interface RequisicaoAutenticada extends Request {
  userId?: string;
}

export function autenticar(req: RequisicaoAutenticada, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

  const [, token] = authHeader.split(' ');

  try {
    const payload = verificarToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}