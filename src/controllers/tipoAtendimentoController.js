import TipoAtendimento from '../models/tipoAtendimento.js';
import TipoPublico from '../models/tipoPublico.js';

export const criarTipoAtendimento = async (req, res) => {
    try {
        const { name, description, public_type_id } = req.body;
        
        if (!name || !public_type_id) {
            return res.status(400).json({ message: 'Nome e ID do Público são obrigatórios.' });
        }
        
        const newTipo = await TipoAtendimento.create({ name, description, public_type_id });
        return res.status(201).json(newTipo);

    } catch (error) {
        console.error('Erro ao criar tipo de atendimento:', error);
        if (error.name === 'SequelizeForeignKeyConstraintError') {
             return res.status(400).json({ message: 'O ID do Público fornecido não existe.' });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const listarTiposAtendimento = async (req, res) => {
    try {
        const types = await TipoAtendimento.findAll({
            include: [{ 
                model: TipoPublico,
                as: 'publicType',
                attributes: ['name']
            }]
        });
        return res.status(200).json(types);
    } catch (error) {
        console.error('Erro ao listar tipos de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const obterTipoAtendimentoPorId = async (req, res) => {
    try {
        const type = await TipoAtendimento.findByPk(req.params.id, {
            include: [{ 
                model: TipoPublico,
                as: 'publicType',
                attributes: ['name']
            }]
        });

        if (!type) {
            return res.status(404).json({ message: 'Tipo de atendimento não encontrado.' });
        }
        return res.status(200).json(type);
    } catch (error) {
        console.error('Erro ao buscar tipo de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const atualizarTipoAtendimento = async (req, res) => {
    try {
        const [updatedRows] = await TipoAtendimento.update(req.body, {
            where: { id_attendance_type: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Tipo de atendimento não encontrado ou nenhum dado para atualizar.' });
        }

        const updatedType = await TipoAtendimento.findByPk(req.params.id, {
            include: [{ model: TipoPublico, as: 'publicType', attributes: ['name'] }]
        });
        return res.status(200).json(updatedType);
    } catch (error) {
        console.error('Erro ao atualizar tipo de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const deletarTipoAtendimento = async (req, res) => {
    try {
        const deletedRows = await TipoAtendimento.destroy({
            where: { id_attendance_type: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Tipo de atendimento não encontrado.' });
        }

        return res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar tipo de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
