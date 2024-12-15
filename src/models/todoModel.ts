import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModel'
class TODO extends Model { 
    // Model methods
};


TODO.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,
        }
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    }
},
{
sequelize,
modelName: 'todo',
tableName: 'todos'
}
);


export default TODO;
