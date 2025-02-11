import { StudentRepository } from "../../Infrastructure/repositories/StudentRepository";
import { AppError } from "../../shared/errors/AppError";

export class DeleteStudent {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(id: number): Promise<void> {
        const student = await this.studentRepository.findById(id);
        if (!student) {
            throw new AppError("STUDENT_NOT_FOUND");
        }

        await this.studentRepository.delete(id);
    }
}
