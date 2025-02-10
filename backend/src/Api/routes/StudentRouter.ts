import {Router} from 'express';
import {StudentController} from '../controllers/StudentController';
import {CreateStudent} from '../../UseCases/Student/CreateStudent';
import {StudentRepository} from '../../Infrastructure/repositories/StudentRepository';

const router = Router();

const studentRepository = new StudentRepository();
const createStudentUseCase = new CreateStudent(studentRepository);
const studentController = new StudentController(createStudentUseCase);

//@ts-ignore
router.post('/', (req, res, next) => studentController.create(req, res, next));

export default router;
