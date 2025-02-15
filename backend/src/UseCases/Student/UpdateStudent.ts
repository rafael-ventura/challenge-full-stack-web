import {StudentRepository} from "../../Infrastructure/repositories/StudentRepository";
import {Student} from "../../Domain/entities/Student";
import {AppError} from "../../shared/errors/AppError";
import {StudentUpdateDTO} from "../../Api/DTOs/StudentUpdateDTO";
import {DataUtils} from "../../shared/utils/dataUtils";

export class UpdateStudent {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(studentId: number, updateStudentReq: StudentUpdateDTO): Promise<Student> {
        const existingStudent = await this.validate(studentId, updateStudentReq);

        const updatedStudent = await this.studentRepository.update(studentId, {
            name: updateStudentReq.name ?? existingStudent.name,
            email: updateStudentReq.email ?? existingStudent.email
        });

        if (!updatedStudent) {
            throw new AppError("FAILED_TO_UPDATE_STUDENT");
        }

        return updatedStudent;
    }

    private async validate(studentId: number, updateStudentReq: StudentUpdateDTO): Promise<Student> {
        if (!updateStudentReq.name || !updateStudentReq.email) {
            throw new AppError('FIELD_REQUIRED');
        }

        if (updateStudentReq.name.length < 2) {
            throw new AppError('INVALID_NAME');
        }

        if (!DataUtils.isValidEmail(updateStudentReq.email)) {
            throw new AppError('INVALID_EMAIL');
        }

        const studentFromDb = await this.studentRepository.findById(studentId);
        if (!studentFromDb) {
            throw new AppError("STUDENT_NOT_FOUND");
        }

        if (updateStudentReq.email !== studentFromDb.email) {
            const studentWithEmail = await this.studentRepository.findByEmail(updateStudentReq.email);
            if (studentWithEmail) {
                throw new AppError('EMAIL_ALREADY_EXISTS');
            }
        }

        return studentFromDb;
    }
}
