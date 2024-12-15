import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();


const getEnvVar = (key:string): string => {
    const value = process.env[key];
    if(!value){
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}
// Connect to PostgreSQL
const sequelize = new Sequelize( 
    getEnvVar('DB_NAME') , 
    getEnvVar('DB_USER'),
    getEnvVar('DB_PASSWORD'), 
    {
    host: getEnvVar('DB_HOST'),   
    dialect: getEnvVar('DB_DIALECT') as 'postgres', 
    logging: false,
});

export default sequelize;
