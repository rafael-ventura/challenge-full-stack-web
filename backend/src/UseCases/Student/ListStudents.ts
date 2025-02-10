import {StudentRepository} from '../../Infrastructure/repositories/StudentRepository';
import {StudentResponseDTO} from '../../Api/DTOs/CreateStudentResponseDTO';

export class ListStudents {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(): Promise<StudentResponseDTO[]> {
        const students = await this.studentRepository.findAll();
        return students.map(student => new StudentResponseDTO(student));
    }
}
