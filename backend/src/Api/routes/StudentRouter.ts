import { Router } from 'express';

const studentRouter = Router();

studentRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'Students API is running!' });
});

export default studentRouter;
