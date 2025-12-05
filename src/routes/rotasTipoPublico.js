import { Router } from 'express';
import { 
    criarTipoPublico,
    listarTiposPublico,
    obterTipoPublicoPorId,
    atualizarTipoPublico,
    deletarTipoPublico
} from '../controllers/tipoPublicoController.js';

const router = Router();

router.route('/tipos-publicos')
    .get(listarTiposPublico) 
    .post(criarTipoPublico); 

router.route('/tipos-publicos/:id')
    .get(obterTipoPublicoPorId) 
    .put(atualizarTipoPublico) 
    .delete(deletarTipoPublico); 

export default router;
