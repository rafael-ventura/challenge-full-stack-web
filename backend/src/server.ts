import express from 'express';
import dotenv from 'dotenv';
import sequelize from './Infrastructure/database';
import routes from './Api/routes/routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Usa o arquivo central de rotas
app.use('/api/v1', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
