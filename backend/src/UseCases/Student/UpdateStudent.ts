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
        const studentExists = await this.studentRepository.findById(id);
        if (!studentExists) {
            throw new AppError("STUDENT_NOT_FOUND");
        }

        const updatedStudent = await this.studentRepository.update(id, {
            name: data.name ?? studentExists.name,
            email: data.email ?? studentExists.email
        });

        if (!updatedStudent) {
            throw new AppError("FAILED_TO_UPDATE_STUDENT");
        }

        return updatedStudent;
    }
}
