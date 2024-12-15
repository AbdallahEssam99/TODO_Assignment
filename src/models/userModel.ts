import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import TODO from './todoModel'

class User extends Model {
    password: any;
};

User.init({
    // Model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(72),
        allowNull: false,
        // validate: {
        //     len: [8, 255],
        //     isValidPassword(value:string) {
        //         const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        //         if (!regex.test(value)) {
        //             throw new Error('Password must be at least 8 characters long and include both letters and numbers.');
        //         }
        //     },
        // },
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
},
// Model options
{
    sequelize,
    modelName: 'user',
    tableName: 'users'
}
);



export default User;

