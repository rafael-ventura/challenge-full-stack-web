import {StudentRepository} from "../../Infrastructure/repositories/StudentRepository";
import {Student} from "../../Domain/entities/Student";
import {AppError} from "../../shared/errors/AppError";
import {UpdateStudentDTO} from "../../Api/DTOs/UpdateStudentDTO";

export class UpdateStudent {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(id: number, data: UpdateStudentDTO): Promise<Student> {
        const student = await this.studentRepository.findById(id);
        if (!student) {
            throw new AppError("STUDENT_NOT_FOUND");
        }

        if (data.name) student.name = data.name;
        if (data.email) student.email = data.email;

        return await this.studentRepository.update(id, student);
    }
}
