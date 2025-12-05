import Perfil from './perfil.js';
import Usuario from './usuario.js'; 
import FormularioAtendimento from './formularioAtendimento.js';
import TipoPublico from './tipoPublico.js'; 
import TipoAtendimento from './tipoAtendimento.js';
import CampoTipoAtendimento from './campoTipoAtendimento.js'; 
import Atendimento from './atendimento.js'; 

Perfil.hasMany(Usuario, { foreignKey: 'profile_id', as: 'users' });
Usuario.belongsTo(Perfil, { foreignKey: 'profile_id', as: 'profile' });

TipoPublico.hasMany(TipoAtendimento, { foreignKey: 'public_type_id', as: 'attendance_types' });
TipoAtendimento.belongsTo(TipoPublico, { foreignKey: 'public_type_id', as: 'publicType' });
TipoAtendimento.hasMany(CampoTipoAtendimento, { foreignKey: 'attendance_type_id', as: 'fields' });
CampoTipoAtendimento.belongsTo(TipoAtendimento, { foreignKey: 'attendance_type_id', as: 'attendanceType' });


Usuario.hasMany(Atendimento, { foreignKey: 'user_id', as: 'registered_attendances' });
Atendimento.belongsTo(Usuario, { foreignKey: 'user_id', as: 'user' });

FormularioAtendimento.hasMany(Atendimento, { foreignKey: 'attendance_form_id', as: 'attendances' });
Atendimento.belongsTo(FormularioAtendimento, { foreignKey: 'attendance_form_id', as: 'attendanceForm' });

TipoPublico.hasMany(Atendimento, { foreignKey: 'public_type_id', as: 'attendances' });
Atendimento.belongsTo(TipoPublico, { foreignKey: 'public_type_id', as: 'publicType' });

TipoAtendimento.hasMany(Atendimento, { foreignKey: 'attendance_type_id', as: 'attendances' });
Atendimento.belongsTo(TipoAtendimento, { foreignKey: 'attendance_type_id', as: 'attendanceType' });


export { Perfil, Usuario, FormularioAtendimento, TipoPublico, TipoAtendimento, CampoTipoAtendimento, Atendimento };
