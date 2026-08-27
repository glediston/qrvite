import { Router } from 'express';
import { autenticar } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { criarEventoSchema, atualizarConviteSchema } from '../schemas/evento.schema';
import {
  criarEventoController,
  listarEventosController,
  buscarPorSlugController,
  atualizarConviteController,
} from '../controllers/evento.controller';

const router = Router();

router.post('/eventos', autenticar, validate(criarEventoSchema), criarEventoController);
router.get('/eventos', autenticar, listarEventosController);
router.patch('/eventos/:id/convite', autenticar, validate(atualizarConviteSchema), atualizarConviteController);
router.get('/e/:slug', buscarPorSlugController);

export default router;