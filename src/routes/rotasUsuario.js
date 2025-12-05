import { Router } from 'express';
import { criarUsuario, listarUsuarios, obterUsuarioPorId } from '../controllers/usuarioController.js'; 

const router = Router();

router.route('/usuarios')
    .get(listarUsuarios) 
    .post(criarUsuario);

router.route('/usuarios/:id')
    .get(obterUsuarioPorId);
    

export default router;
