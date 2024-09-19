const {DataTypes} = require("sequelize");
const sequelize = require("../config/config");


const Participante = sequelize.define('participante',{
    
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eventoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {       
            model: 'Evento',
            key: 'id'
          }
    }
})

module.exports = Participante;