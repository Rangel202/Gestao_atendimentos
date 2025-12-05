import { Parser } from 'json2csv';
import { Op } from 'sequelize';
import Atendimento from '../models/atendimento.js';
import FormularioAtendimento from '../models/formularioAtendimento.js';
import TipoPublico from '../models/tipoPublico.js';
import TipoAtendimento from '../models/tipoAtendimento.js';
import Usuario from '../models/usuario.js';

export const exportarAtendimentosCSV = async (req, res) => {
    try {
        const { formId, publicTypeId, typeId, startDate, endDate } = req.query;

        const whereCondition = {};
        const attendanceTypeWhere = {};
        const publicTypeWhere = {};
        const attendanceFormWhere = {};

        if (startDate && endDate) {
            whereCondition.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        if (formId) attendanceFormWhere.id_form = formId;
        if (publicTypeId) publicTypeWhere.id_public = publicTypeId;
        if (typeId) attendanceTypeWhere.id_attendance_type = typeId;


        const attendances = await Atendimento.findAll({
            where: whereCondition,
            include: [
                { model: FormularioAtendimento, as: 'attendanceForm', attributes: ['name'], where: attendanceFormWhere },
                { model: TipoPublico, as: 'publicType', attributes: ['name'], where: publicTypeWhere },
                { model: TipoAtendimento, as: 'attendanceType', attributes: ['name'], where: attendanceTypeWhere },
                { model: Usuario, as: 'user', attributes: ['name'] },
            ],
            raw: true, 
            nest: true 
        });

        const dataToExport = attendances.map(att => {
            const baseData = {
                'ID Atendimento': att.id_attendance,
                'Data de Registro': att.createdAt,
                'Resumo': att.summary,
                'Resolvido': att.is_resolved ? 'Sim' : 'Não',
                'Registrado Por': att.user.name,
                'Forma Atendimento': att.attendanceForm.name,
                'Público': att.publicType.name,
                'Tipo Atendimento': att.attendanceType.name,
            };
            
            const dynamicFields = {};
            if (att.dynamic_data) {
                for (const key in att.dynamic_data) {
                    dynamicFields[`Campo_${key}`] = att.dynamic_data[key];
                }
            }

            return { ...baseData, ...dynamicFields };
        });

        if (dataToExport.length === 0) {
            return res.status(200).send("ID Atendimento,Data de Registro,Resumo\n");
        }

        const fields = Object.keys(dataToExport[0]);
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(dataToExport);

        res.header('Content-Type', 'text/csv');
        res.attachment('relatorio_atendimentos.csv');
        return res.send(csv);

    } catch (error) {
        console.error('Erro ao gerar relatório CSV:', error);
        return res.status(500).json({ message: 'Erro ao processar o relatório.' });
    }
};
