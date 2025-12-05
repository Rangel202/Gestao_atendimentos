import { Router } from 'express';
import { criarAtendimento, listarAtendimentos } from '../controllers/atendimentoController.js';

const router = Router();

router.route('/atendimentos')
    .get(listarAtendimentos)
    .post(criarAtendimento);

export default router;
