import {jest} from "@jest/globals";
import {UpdateStudent} from "../../src/UseCases/Student/UpdateStudent";
import {StudentRepository} from "../../src/Infrastructure/repositories/StudentRepository";
import {Student} from "../../src/Domain/entities/Student";
import {UpdateStudentDTO} from "../../src/Api/DTOs/UpdateStudentDTO";
import {AppError} from "../../src/shared/errors/AppError";

describe("Update Student Use Case", () => {
    let updateStudentUseCase: UpdateStudent;
    let studentRepository: StudentRepository;

    beforeEach(() => {
        studentRepository = new StudentRepository();
        updateStudentUseCase = new UpdateStudent(studentRepository);

        jest.spyOn(studentRepository, "findById").mockResolvedValue(
            new Student("John Doe", "john.doe@example.com", "12345", "123.456.789-10")
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should update a student successfully", async () => {
        const studentDto: UpdateStudentDTO = {
            name: "Updated Name",
            email: "updated@example.com",
        };

        jest.spyOn(studentRepository, "update").mockResolvedValue(
            new Student("Updated Name", "updated@example.com", "12345", "123.456.789-10")
        );

        const student = await updateStudentUseCase.execute(1, studentDto);
        expect(student.name).toBe("Updated Name");
    });

    it("should throw an error if student is not found", async () => {
        jest.spyOn(studentRepository, "findById").mockResolvedValue(null);

        const studentDto: UpdateStudentDTO = {
            name: "Updated Name",
            email: "updated@example.com",
        };

        await expect(updateStudentUseCase.execute(999, studentDto)).rejects.toThrow(AppError);
    });
});
