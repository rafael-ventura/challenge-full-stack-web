import { Router } from 'express';
import studentRouter from './StudentRouter';

const router = Router();


router.use('/students', studentRouter);

export default router;
