import {ListStudents} from "../../../UseCases/Student/ListStudents";
import {StudentRepository} from "../../../Infrastructure/repositories/StudentRepository";
import {Student} from "../../../Domain/entities/Student";
import {StudentCreateResponseDTO} from "../../../Api/DTOs/StudentCreateResponseDTO";


describe("List Students Use Case", () => {
    let listStudentsUseCase: ListStudents;
    let studentRepository: StudentRepository;

    beforeEach(() => {
        studentRepository = new StudentRepository();
        listStudentsUseCase = new ListStudents(studentRepository);

        jest.spyOn(studentRepository, "findAll").mockResolvedValue([
            new Student("John Doe", "john.doe@example.com", "12345", "123.456.789-10"),
            new Student("Alice Doe", "alice.doe@example.com", "67890", "987.654.321-00"),
        ]);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return a list of StudentCreateResponseDTO", async () => {
        const students = await listStudentsUseCase.execute();

        expect(students).toHaveLength(2);
        expect(students[0]).toBeInstanceOf(StudentCreateResponseDTO);
        expect(students[0].name).toBe("John Doe");
    });

    it("should call repository findAll method once", async () => {
        const findAllSpy = jest.spyOn(studentRepository, "findAll");

        await listStudentsUseCase.execute();

        expect(findAllSpy).toHaveBeenCalledTimes(1);
    });

    it("✅ should return an empty array if no students are found", async () => {
        jest.spyOn(studentRepository, "findAll").mockResolvedValue([]);

        const students = await listStudentsUseCase.execute();

        expect(students).toEqual([]);
    });


});
