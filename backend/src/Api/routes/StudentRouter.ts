import {Router} from 'express';
import {StudentController} from '../controllers/StudentController';
import {CreateStudent} from '../../UseCases/Student/CreateStudent';
import {StudentRepository} from '../../Infrastructure/repositories/StudentRepository';
import {ListStudents} from "../../UseCases/Student/ListStudents";

const router = Router();

const studentRepository = new StudentRepository();
const createStudentUseCase = new CreateStudent(studentRepository);
const listStudentsUseCase = new ListStudents(studentRepository);
const studentController = new StudentController(createStudentUseCase, listStudentsUseCase);

//@ts-ignore
router.post('/', studentController.create);

//@ts-ignore
router.get('/', studentController.getAll);

export default router;
