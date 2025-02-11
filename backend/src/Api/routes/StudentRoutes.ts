import {Router} from "express";
import {StudentController} from "../controllers/StudentController";
import {CreateStudent} from "../../UseCases/Student/CreateStudent";
import {StudentRepository} from "../../Infrastructure/repositories/StudentRepository";
import {ListStudents} from "../../UseCases/Student/ListStudents";
import {UpdateStudent} from "../../UseCases/Student/UpdateStudent";
import {DeleteStudent} from "../../UseCases/Student/DeleteStudent";
import {asyncHandler} from "../middlewares/asyncHandler";

const router = Router();

const studentRepository = new StudentRepository();
const createStudentUseCase = new CreateStudent(studentRepository);
const listStudentsUseCase = new ListStudents(studentRepository);
const updateStudentUseCase = new UpdateStudent(studentRepository);
const deleteStudentUseCase = new DeleteStudent(studentRepository);


const studentController = StudentController(
    createStudentUseCase,
    listStudentsUseCase,
    updateStudentUseCase,
    deleteStudentUseCase
);

router.post("/", asyncHandler(studentController.create));
router.put("/:id", asyncHandler(studentController.update));
router.get("/", asyncHandler(studentController.getAll));
router.delete("/:id", asyncHandler(studentController.delete));

export default router;
