import { DataTypes, Model } from "sequelize";
import sequelize from "../dbconfig.js";

export class Escucha extends Model {}
Escucha.init(
    {
        id : { 
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        usuarioId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        cancionId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        fechaEscucha : {
            type : DataTypes.DATE,
            allowNull : false
        }
    },
    {
    sequelize,
    modelName : 'escucha',
    tableName : 'escuchas'
}
)
