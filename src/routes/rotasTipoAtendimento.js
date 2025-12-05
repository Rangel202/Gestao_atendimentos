import { Router } from 'express';
import { 
    criarTipoAtendimento,
    listarTiposAtendimento,
    obterTipoAtendimentoPorId,
    atualizarTipoAtendimento,
    deletarTipoAtendimento
} from '../controllers/tipoAtendimentoController.js';

const router = Router();

router.route('/tipos-atendimento')
    .get(listarTiposAtendimento) 
    .post(criarTipoAtendimento); 

router.route('/tipos-atendimento/:id')
    .get(obterTipoAtendimentoPorId) 
    .put(atualizarTipoAtendimento) 
    .delete(deletarTipoAtendimento); 

export default router;
