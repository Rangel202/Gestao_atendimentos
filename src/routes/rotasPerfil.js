import { Router } from 'express';
import { 
    criarPerfil,
    listarPerfis,
    obterPerfilPorId,
    atualizarPerfil,
    deletarPerfil
} from '../controllers/perfilController.js';

const router = Router();

router.route('/perfis')
    .get(listarPerfis) 
    .post(criarPerfil); 

router.route('/perfis/:id')
    .get(obterPerfilPorId) 
    .put(atualizarPerfil) 
    .delete(deletarPerfil); 

export default router;
