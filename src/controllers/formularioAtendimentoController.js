import FormularioAtendimento from '../models/formularioAtendimento.js';


export const criarFormularioAtendimento = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'O nome da forma de atendimento é obrigatório.' });
        }
        
        const newForm = await FormularioAtendimento.create({ name });
        return res.status(201).json(newForm);

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Forma de atendimento já cadastrada.' });
        }
        console.error('Erro ao criar forma de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


export const listarFormulariosAtendimento = async (req, res) => {
    try {
        const forms = await FormularioAtendimento.findAll();
        return res.status(200).json(forms);
    } catch (error) {
        console.error('Erro ao listar formas de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


export const obterFormularioAtendimentoPorId = async (req, res) => {
    try {
        const form = await FormularioAtendimento.findByPk(req.params.id);

        if (!form) {
            return res.status(404).json({ message: 'Forma de atendimento não encontrada.' });
        }
        return res.status(200).json(form);
    } catch (error) {
        console.error('Erro ao buscar forma de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


export const atualizarFormularioAtendimento = async (req, res) => {
    try {
        const [updatedRows] = await FormularioAtendimento.update(req.body, {
            where: { id_form: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Forma de atendimento não encontrada ou nenhum dado para atualizar.' });
        }

        const updatedForm = await FormularioAtendimento.findByPk(req.params.id);
        return res.status(200).json(updatedForm);
        
    } catch (error) {
        console.error('Erro ao atualizar forma de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


export const deletarFormularioAtendimento = async (req, res) => {
    try {
        const deletedRows = await FormularioAtendimento.destroy({
            where: { id_form: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Forma de atendimento não encontrada.' });
        }

        return res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar forma de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
