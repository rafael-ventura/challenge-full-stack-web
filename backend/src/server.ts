import express from 'express';
import dotenv from 'dotenv';
import sequelize, {syncDatabase} from './Infrastructure/database';
import routes from './Api/routes/Routes';
import {errorHandler} from './Api/middlewares/errorHandler';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');

        await syncDatabase();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use('/api/v1', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
