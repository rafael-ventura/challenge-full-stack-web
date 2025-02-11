import {jest} from "@jest/globals";
import {DeleteStudent} from "../../src/UseCases/Student/DeleteStudent";
import {StudentRepository} from "../../src/Infrastructure/repositories/StudentRepository";
import {Student} from "../../src/Domain/entities/Student";

describe("Delete Student Use Case", () => {
    let deleteStudentUseCase: DeleteStudent;
    let studentRepository: StudentRepository;

    beforeEach(() => {
        studentRepository = new StudentRepository();
        deleteStudentUseCase = new DeleteStudent(studentRepository);

        jest.spyOn(studentRepository, "findById").mockResolvedValue(
            new Student("John Doe", "john.doe@example.com", "12345", "123.456.789-10")
        );
        jest.spyOn(studentRepository, "delete").mockResolvedValue(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should delete a student successfully", async () => {
        await expect(deleteStudentUseCase.execute(1)).resolves.not.toThrow();
    });

    it("should throw an error if student is not found", async () => {
        jest.spyOn(studentRepository, "findById").mockResolvedValue(null);
        await expect(deleteStudentUseCase.execute(999)).rejects.toThrow("Student not found");
    });
});
