import { Router } from 'express';
import { criarCampoTipoAtendimento, listarCamposTipoAtendimento } from '../controllers/campoTipoAtendimentoController.js';

const router = Router();

router.route('/campos-tipo')
    .get(listarCamposTipoAtendimento) 
    .post(criarCampoTipoAtendimento); 

export default router;
