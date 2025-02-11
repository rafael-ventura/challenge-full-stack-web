import {ListStudents} from "../../src/UseCases/Student/ListStudents";
import {jest} from "@jest/globals";
import {Student} from "../../src/Domain/entities/Student";
import {StudentRepository} from "../../src/Infrastructure/repositories/StudentRepository";

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

    it("should list all students", async () => {
        const students = await listStudentsUseCase.execute();

        expect(students).toHaveLength(2);
        expect(students[0].name).toBe("John Doe");
    });

    it("should return an empty array if no students are found", async () => {
        jest.spyOn(studentRepository, "findAll").mockResolvedValue([]);
        const students = await listStudentsUseCase.execute();
        expect(students).toEqual([]);
    });

    it("should handle errors properly", async () => {
        jest.spyOn(studentRepository, "findAll").mockRejectedValue(new Error("Database error"));
        await expect(listStudentsUseCase.execute()).rejects.toThrow("Database error");
    });
});
