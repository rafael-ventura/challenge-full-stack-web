import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class StudentModel extends Model {}

StudentModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        ra: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'students',
        timestamps: true,
    }
);

export default StudentModel;
