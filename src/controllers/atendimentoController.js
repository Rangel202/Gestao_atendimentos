import Atendimento from '../models/atendimento.js';
import CampoTipoAtendimento from '../models/campoTipoAtendimento.js';
import Usuario from '../models/usuario.js';
import FormularioAtendimento from '../models/formularioAtendimento.js';
import TipoPublico from '../models/tipoPublico.js';
import TipoAtendimento from '../models/tipoAtendimento.js';


export const criarAtendimento = async (req, res) => {
    try {
        const { summary, user_id, attendance_type_id, ...rest } = req.body;
        
      
        const requiredFields = ['user_id', 'attendance_form_id', 'public_type_id', 'attendance_type_id', 'summary'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `O campo '${field}' é obrigatório.` });
            }
        }
        
      
        const fieldsConfig = await CampoTipoAtendimento.findAll({
            where: { attendance_type_id: attendance_type_id, is_required: true },
            attributes: ['field_name', 'label']
        });

        const dynamicData = rest.dynamic_data || {};
        
        for (const field of fieldsConfig) {
            if (!dynamicData[field.field_name]) {
                
                return res.status(400).json({ 
                    message: `O campo dinâmico obrigatório '${field.label}' (${field.field_name}) não foi preenchido.` 
                });
            }
        }


        const newAttendance = await Atendimento.create(req.body);

        return res.status(201).json(newAttendance);

    } catch (error) {
        console.error('Erro ao registrar atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor. Verifique se todas as chaves estrangeiras (IDs) existem.' });
    }
};

export const listarAtendimentos = async (req, res) => {
    try {
        const attendances = await Atendimento.findAll({
         
            include: [
                { model: Usuario, as: 'user', attributes: ['name', 'email'] },
                { model: FormularioAtendimento, as: 'attendanceForm', attributes: ['name'] },
                { model: TipoPublico, as: 'publicType', attributes: ['name'] },
                { model: TipoAtendimento, as: 'attendanceType', attributes: ['name'] },
            ],
           
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json(attendances);
    } catch (error) {
        console.error('Erro ao listar atendimentos:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

