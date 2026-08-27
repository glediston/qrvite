import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function registrarController(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;
    const token = await authService.registrar(email, senha);
    res.status(201).json({ mensagem: 'Usuário registrado com sucesso.',  token });
  } catch (erro: any) {
    res.status(400).json({ erro: erro.message });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;
    const token = await authService.login(email, senha);
    res.json({ token });
  } catch (erro: any) {
    res.status(401).json({ erro: erro.message });
  }
}