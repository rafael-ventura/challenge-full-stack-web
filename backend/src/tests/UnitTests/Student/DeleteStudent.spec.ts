import {DeleteStudent} from "../../../UseCases/Student/DeleteStudent";
import {StudentRepository} from "../../../Infrastructure/repositories/StudentRepository";
import {Student} from "../../../Domain/entities/Student";
import {AppError} from "../../../shared/errors/AppError";

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

    it("should delete a] student successfully", async () => {
        await expect(deleteStudentUseCase.execute(1)).resolves.not.toThrow();
    });

    it("should throw an error if student is not found", async () => {
        jest.spyOn(studentRepository, "findById").mockResolvedValue(null);

        await expect(deleteStudentUseCase.execute(999))
            .rejects.toThrow(new AppError("STUDENT_NOT_FOUND"));
    });

    it("should throw an error if delete operation fails", async () => {
        jest.spyOn(studentRepository, "delete").mockRejectedValue(new Error("Database error"));

        await expect(deleteStudentUseCase.execute(1))
            .rejects.toThrow(new Error("Database error"));
    });

    it("should throw an error if student ID is invalid", async () => {
        await expect(deleteStudentUseCase.execute(-1))
            .rejects.toThrow(new AppError("INVALID_ID"));

        await expect(deleteStudentUseCase.execute(NaN))
            .rejects.toThrow(new AppError("INVALID_ID"));
    });


});
