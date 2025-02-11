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

        const emailExists = await this.studentRepository.findByEmail(data.email);
        if (emailExists) {
            throw new AppError('EMAIL_ALREADY_EXISTS');
        }

        const raExists = await this.studentRepository.findByRA(data.ra);
        if (raExists) {
            throw new AppError('RA_ALREADY_EXISTS');
        }

        return await this.studentRepository.create(new Student(data.name, data.email, data.ra, data.cpf));
    }
}
