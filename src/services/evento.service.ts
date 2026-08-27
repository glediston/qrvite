import { prisma } from '../config/prisma';
import { randomBytes } from 'crypto';

function gerarSlug(nome: string): string {
  const base = nome.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const sufixo = randomBytes(3).toString('hex');
  return `${base}-${sufixo}`;
}

export async function criarEvento(userId: string, dados: { nome: string; cidade: string; data: string; planoId: string }) {
  const plano = await prisma.plano.findUnique({ where: { id: dados.planoId } });
  if (!plano) throw new Error('Plano inválido');

  const statusInicial = plano.preco > 0 ? 'pendente_pagamento' : 'montando_convite';

  return prisma.evento.create({
    data: {
      nome: dados.nome,
      cidade: dados.cidade,
      data: new Date(dados.data),
      slug: gerarSlug(dados.nome),
      planoId: dados.planoId,
      userId,
      status: statusInicial,
    },
  });
}

export async function listarEventosDoUsuario(userId: string) {
  return prisma.evento.findMany({ where: { userId } });
}

export async function buscarPorSlug(slug: string) {
  const evento = await prisma.evento.findUnique({ where: { slug } });
  if (!evento || evento.status !== 'ativo') throw new Error('Evento não encontrado');
  return evento;
}

export async function atualizarConvite(eventoId: string, userId: string, dados: { tipoEvento?: string; fraseConvite?: string; fotoCapaUrl?: string }) {
  const evento = await prisma.evento.findFirst({ where: { id: eventoId, userId } });
  if (!evento) throw new Error('Evento não encontrado');

  return prisma.evento.update({
    where: { id: eventoId },
    data: { ...dados, status: evento.status === 'montando_convite' ? 'ativo' : evento.status },
  });
}