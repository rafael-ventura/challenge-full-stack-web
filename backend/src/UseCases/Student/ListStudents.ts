import {StudentRepository} from '../../Infrastructure/repositories/StudentRepository';
import {StudentCreateResponseDTO} from '../../Api/DTOs/StudentCreateResponseDTO';

export class ListStudents {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(): Promise<StudentCreateResponseDTO[]> {
        const students = await this.studentRepository.findAll();
        return students.map(student => new StudentCreateResponseDTO(student));
    }
}
