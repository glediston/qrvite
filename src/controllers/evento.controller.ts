import { Response } from 'express';
import { RequisicaoAutenticada } from '../middlewares/auth.middleware';
import * as eventoService from '../services/evento.service';

export async function criarEventoController(req: RequisicaoAutenticada, res: Response) {
  try {
    const evento = await eventoService.criarEvento(req.userId as string, req.body);
    res.status(201).json(evento);
  } catch (erro: any) {
    res.status(400).json({ erro: erro.message });
  }
}

export async function listarEventosController(req: RequisicaoAutenticada, res: Response) {
  const eventos = await eventoService.listarEventosDoUsuario(req.userId as string);
  res.json(eventos);
}

export async function buscarPorSlugController(req: any, res: Response) {
  try {
    const evento = await eventoService.buscarPorSlug(req.params.slug);
    res.json(evento);
  } catch (erro: any) {
    res.status(404).json({ erro: erro.message });
  }
}

export async function atualizarConviteController(req: RequisicaoAutenticada, res: Response) {
  try {
    const evento = await eventoService.atualizarConvite(req.params.id as string, req.userId as string, req.body);
    res.json(evento);
  } catch (erro: any) {
    res.status(400).json({ erro: erro.message });
  }
}