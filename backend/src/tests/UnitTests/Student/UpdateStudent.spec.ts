import {UpdateStudent} from "../../../UseCases/Student/UpdateStudent";
import {StudentRepository} from "../../../Infrastructure/repositories/StudentRepository";
import {Student} from "../../../Domain/entities/Student";
import {StudentUpdateDTO} from "../../../Api/DTOs/StudentUpdateDTO";
import {AppError} from "../../../shared/errors/AppError";


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

    it("should call repository update method with correct values", async () => {
        const studentDto: StudentUpdateDTO = {
            name: "Updated Name",
            email: "updated@example.com",
        };

        const updateSpy = jest.spyOn(studentRepository, "update").mockResolvedValue(
            new Student("Updated Name", "updated@example.com", "12345", "123.456.789-10")
        );

        await updateStudentUseCase.execute(1, studentDto);

        expect(updateSpy).toHaveBeenCalledWith(1, {
            name: "Updated Name",
            email: "updated@example.com",
        });
    });

    it("should throw an error if student is not found", async () => {
        jest.spyOn(studentRepository, "findById").mockResolvedValue(null);

        const studentDto: StudentUpdateDTO = {
            name: "Updated Name",
            email: "updated@example.com",
        };

        await expect(updateStudentUseCase.execute(999, studentDto)).rejects.toThrow(AppError);
    });

    it("should throw an error if required fields are missing", async () => {
        const studentDto: StudentUpdateDTO = {name: "", email: ""};

        await expect(updateStudentUseCase.execute(1, studentDto))
            .rejects.toThrow(new AppError("FIELD_REQUIRED"));
    });

    it("should throw an error if name is too short", async () => {
        const studentDto: StudentUpdateDTO = {name: "J", email: "updated@example.com"};

        await expect(updateStudentUseCase.execute(1, studentDto))
            .rejects.toThrow(new AppError("INVALID_NAME"));
    });

    it("should throw an error if email is invalid", async () => {
        const studentDto: StudentUpdateDTO = {name: "Updated Name", email: "invalid-email"};

        await expect(updateStudentUseCase.execute(1, studentDto))
            .rejects.toThrow(new AppError("INVALID_EMAIL"));
    });

    it("should throw an error if email already exists", async () => {
        jest.spyOn(studentRepository, "findByEmail").mockResolvedValue(
            new Student("Existing User", "existing@example.com", "67890", "98765432100")
        );

        const studentDto: StudentUpdateDTO = {name: "Updated Name", email: "existing@example.com"};

        await expect(updateStudentUseCase.execute(1, studentDto))
            .rejects.toThrow(new AppError("EMAIL_ALREADY_EXISTS"));
    });

    it("should throw an error if update operation fails", async () => {
        jest.spyOn(studentRepository, "update").mockResolvedValue(null);

        const studentDto: StudentUpdateDTO = {name: "Updated Name", email: "updated@example.com"};

        await expect(updateStudentUseCase.execute(1, studentDto))
            .rejects.toThrow(new AppError("FAILED_TO_UPDATE_STUDENT"));
    });

});
