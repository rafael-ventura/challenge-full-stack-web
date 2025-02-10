import {StudentRepository} from '../../Infrastructure/repositories/StudentRepository';
import {AppError} from '../../shared/errors/AppError';
import {Student} from '../../Domain/entities/Student';
import {CreateStudentDTO} from "../../Api/DTOs/CreateStudentDTO";

export class CreateStudent {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(data: CreateStudentDTO): Promise<Student> {
        if (!data.name || !data.email || !data.ra || !data.cpf) {
            throw new AppError('VALIDATION_ERROR');
        }

        if (await this.studentRepository.findByEmail(data.email)) {
            throw new AppError('EMAIL_ALREADY_EXISTS');
        }

        if (await this.studentRepository.findByRA(data.ra)) {
            throw new AppError('RA_ALREADY_EXISTS');
        }

        const student = new Student(data.name, data.email, data.ra, data.cpf);
        await this.studentRepository.create(student);
        return student;
    }
}
