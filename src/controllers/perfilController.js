import Perfil from '../models/perfil.js';

export const criarPerfil = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'O nome do perfil é obrigatório.' });
        }
        
        const newProfile = await Perfil.create({ name, permissions });
        return res.status(201).json(newProfile);

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Perfil com este nome já existe.' });
        }
        console.error('Erro ao criar perfil:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const listarPerfis = async (req, res) => {
    try {
        const profiles = await Perfil.findAll();
        return res.status(200).json(profiles);
    } catch (error) {
        console.error('Erro ao listar perfis:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const obterPerfilPorId = async (req, res) => {
    try {
        const profile = await Perfil.findByPk(req.params.id);

        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }
        return res.status(200).json(profile);
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const atualizarPerfil = async (req, res) => {
    try {
        const [updatedRows] = await Perfil.update(req.body, {
            where: { id_profile: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Perfil não encontrado ou nenhum dado para atualizar.' });
        }

        const updatedProfile = await Perfil.findByPk(req.params.id);
        return res.status(200).json(updatedProfile);
        
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const deletarPerfil = async (req, res) => {
    try {
        const deletedRows = await Perfil.destroy({
            where: { id_profile: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }

        return res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar perfil:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
