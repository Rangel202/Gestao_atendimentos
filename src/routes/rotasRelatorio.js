import { Router } from 'express';
import { exportarAtendimentosCSV } from '../controllers/relatorioController.js'; 

const router = Router();

router.get('/relatorios/atendimentos-csv', exportarAtendimentosCSV); 

export default router;
