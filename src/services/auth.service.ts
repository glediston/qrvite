import { prisma } from '../config/prisma';
import { hashSenha, compararSenha } from '../utils/hash';
import { gerarToken } from '../utils/jwt';

export async function registrar(email: string, senha: string) {
  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) throw new Error('Email já cadastrado');

  const senhaHash = await hashSenha(senha);
  const user = await prisma.user.create({ data: { email, senhaHash } });

  return gerarToken(user.id);
}

export async function login(email: string, senha: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciais inválidas');

  const senhaCorreta = await compararSenha(senha, user.senhaHash);
  if (!senhaCorreta) throw new Error('Credenciais inválidas');

  return gerarToken(user.id);
}