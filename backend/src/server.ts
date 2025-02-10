import express from 'express';
import dotenv from 'dotenv';
import sequelize from './Infrastructure/database';

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

app.get('/', (req, res) => {
    res.send('API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
