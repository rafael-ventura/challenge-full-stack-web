import {Router} from 'express';
import {StudentController} from '../controllers/StudentController';
import {CreateStudent} from '../../UseCases/Student/CreateStudent';
import {StudentRepository} from '../../Infrastructure/repositories/StudentRepository';
import {ListStudents} from "../../UseCases/Student/ListStudents";
import {UpdateStudent} from "../../UseCases/Student/UpdateStudent";

const router = Router();

const studentRepository = new StudentRepository();
const createStudentUseCase = new CreateStudent(studentRepository);
const listStudentsUseCase = new ListStudents(studentRepository);
const updateStudentUseCase = new UpdateStudent(studentRepository);
const studentController = new StudentController(createStudentUseCase, listStudentsUseCase, updateStudentUseCase);

//@ts-ignore
router.post('/', studentController.create);

//@ts-ignore
router.put('/:id', studentController.update);

//@ts-ignore
router.get('/', studentController.getAll);

export default router;
