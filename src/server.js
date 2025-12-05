import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import './models/associacoes.js';

import perfilRoutes from './routes/rotasPerfil.js'; 
import usuarioRoutes from './routes/rotasUsuario.js'; 
import autenticacaoRoutes from './routes/rotasAutenticacao.js';
import formularioAtendimentoRoutes from './routes/rotasFormularioAtendimento.js';
import tipoPublicoRoutes from './routes/rotasTipoPublico.js';
import tipoAtendimentoRoutes from './routes/rotasTipoAtendimento.js';
import campoTipoAtendimentoRoutes from './routes/rotasCampoTipoAtendimento.js';
import atendimentoRoutes from './routes/rotasAtendimento.js';
import relatorioRoutes from './routes/rotasRelatorio.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, 'view', 'projeto-atendimentos-frontend');

// Serve static frontend files (HTML/CSS/JS) from src/view/projeto-atendimentos-frontend
app.use(express.static(frontendPath));

app.use('/api', perfilRoutes); 
app.use('/api', usuarioRoutes);    
app.use('/api', autenticacaoRoutes);
app.use('/api', formularioAtendimentoRoutes);
app.use('/api', tipoPublicoRoutes);
app.use('/api', tipoAtendimentoRoutes);
app.use('/api', campoTipoAtendimentoRoutes);
app.use('/api', atendimentoRoutes);
app.use('/api', relatorioRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Keep API routes under /api; any other static file will be served from the frontend folder

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(' Conexão com o banco de dados MySQL estabelecida com sucesso!');

        await sequelize.sync(); 
        console.log('Tabelas e Associações sincronizadas.');

        app.listen(PORT, () => {
            console.log(` Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(' Erro ao iniciar o servidor ou conectar ao DB:', error);
    }
};

startServer();