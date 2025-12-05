import { Router } from 'express';
import { 
    criarFormularioAtendimento,
    listarFormulariosAtendimento,
    obterFormularioAtendimentoPorId,
    atualizarFormularioAtendimento,
    deletarFormularioAtendimento
} from '../controllers/formularioAtendimentoController.js';

const router = Router();

router.route('/formularios')
    .get(listarFormulariosAtendimento) 
    .post(criarFormularioAtendimento); 

router.route('/formularios/:id')
    .get(obterFormularioAtendimentoPorId) 
    .put(atualizarFormularioAtendimento) 
    .delete(deletarFormularioAtendimento); 

export default router;
