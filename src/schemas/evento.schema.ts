import { z } from 'zod';

export const criarEventoSchema = z.object({
  nome: z.string().min(3),
  cidade: z.string().min(2),
  data: z.string(),
  planoId: z.string().uuid(),
  cupom: z.string().optional(),
});

export const atualizarConviteSchema = z.object({
  tipoEvento: z.string().optional(),
  fraseConvite: z.string().optional(),
  fotoCapaUrl: z.string().url().optional(),
});