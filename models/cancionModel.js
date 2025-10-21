import { DataTypes, Model } from "sequelize";
import sequelize from "../dbconfig.js";

export class Cancion extends Model {}

Cancion.init(
    {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nombre : {
        type : DataTypes.STRING,
        allowNull : false
    }
},
{
    sequelize,
    modelName : 'cancion',
    tableName : 'canciones'
}
);