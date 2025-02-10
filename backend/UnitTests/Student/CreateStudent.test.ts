import {CreateStudent} from '../../src/UseCases/Student/CreateStudent';
import {StudentRepository} from '../../src/Infrastructure/repositories/StudentRepository';
import {jest} from '@jest/globals';
import {AppError} from '../../src/shared/errors/AppError';
import {Student} from '../../src/Domain/entities/Student';
import {CreateStudentDTO} from "../../src/Api/DTOs/CreateStudentDTO";

describe('Create Student Use Case', () => {
    let createStudentUseCase: CreateStudent;
    let studentRepository: StudentRepository;

    beforeEach(() => {
        studentRepository = new StudentRepository();
        createStudentUseCase = new CreateStudent(studentRepository);

        jest.spyOn(studentRepository, 'findByEmail').mockResolvedValue(null);
        jest.spyOn(studentRepository, 'findByRA').mockResolvedValue(null);
        jest.spyOn(studentRepository, 'create').mockResolvedValue(
            new Student('John Doe', 'john.doe@example.com', '12345', '123.456.789-10')
        );
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Limpa os mocks após cada teste
    });

    it('should create a student successfully', async () => {

        const studentDto: CreateStudentDTO = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            ra: '14578',
            cpf: '123.456.789-10'
        }
        const student = await createStudentUseCase.execute(studentDto);

        expect(student).toBeInstanceOf(Student);
        expect(student.name).toBe('John Doe');
        expect(student.email).toBe('john.doe@example.com');
        expect(student.ra).toBe('14578');
    });


    it('should throw an error when required fields are missing', async () => {
        const studentDto: CreateStudentDTO = {
            name: 'John Doe',
            email: '@example.com',
            ra: '',
            cpf: '123.456.789-10'
        }
        await expect(createStudentUseCase.execute(studentDto)).rejects.toThrow(AppError);
    });

    it('should throw an error if email already exists', async () => {
        jest.spyOn(studentRepository, 'findByEmail').mockResolvedValue(
            new Student('Existing User', 'test@example.com', '67890', '987.654.321-00')
        );
        const studentDto: CreateStudentDTO = {
            name: 'John Doe',
            email: 'test@example.com',
            ra: '12345',
            cpf: '123.456.789-10'
        }
        await expect(createStudentUseCase.execute(studentDto)).rejects.toThrow(AppError);
    });

    it('should throw an error if RA already exists', async () => {
        jest.spyOn(studentRepository, 'findByRA').mockResolvedValue(
            new Student('Another User', 'another@example.com', '12345', '111.222.333-44')
        );

        const studentDto: CreateStudentDTO = {
            name: 'John Doe',
            email: 'test@example.com',
            ra: '12345',
            cpf: '123.456.789-10'
        }
        await expect(createStudentUseCase.execute(studentDto)).rejects.toThrow(AppError);
    });
});
