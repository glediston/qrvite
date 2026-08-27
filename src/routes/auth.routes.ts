import { Router } from 'express';
import { registrarController, loginController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { registroSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/registro', validate(registroSchema), registrarController);
router.post('/login', validate(loginSchema), loginController);

export default router;