import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize, {syncDatabase} from './Infrastructure/database';
import routes from './Api/routes/Routes';
import {errorHandler} from './Api/middlewares/errorHandler';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
    cors({
        origin: frontendUrl,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

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

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
