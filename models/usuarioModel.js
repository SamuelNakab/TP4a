import { DataTypes, Model } from "sequelize";
import sequelize from "../dbconfig.js";

export class Usuario extends Model {}

Usuarios.init(
    {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        nombre : {
            type : DataTypes.STRING,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING(64),
            allowNull : false,

        },
        rol : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize,
        modelName : 'usuario',
        tableName : 'usuarios'
    }
)