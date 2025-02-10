import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        dialect: 'postgres',
        logging: false,
    }
);

// 🟢 Cria a tabela automaticamente se ela não existir
export const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // Não apaga os dados existentes
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Database synchronization failed:', error);
    }
};

export default sequelize;
