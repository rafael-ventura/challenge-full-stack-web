export const ERROR_MESSAGES = {
    VALIDATION_ERROR: {
        message: 'All fields are required',
        internalCode: 'VALIDATION_ERROR',
        statusCode: 400,
    },
    EMAIL_ALREADY_EXISTS: {
        message: 'Email already exists',
        internalCode: 'EMAIL_ALREADY_EXISTS',
        statusCode: 400,
    },
    RA_ALREADY_EXISTS: {
        message: 'RA already exists',
        internalCode: 'RA_ALREADY_EXISTS',
        statusCode: 400,
    },
    INTERNAL_SERVER_ERROR: {
        message: 'Internal Server Error',
        internalCode: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
    },
    STUDENT_NOT_FOUND: {
        message: 'Student not found',
        internalCode: 'STUDENT_NOT_FOUND',
        statusCode: 404,
    },
    CANNOT_UPDATE_RA_OR_CPF: {
        message: 'RA and CPF cannot be updated',
        internalCode: 'CANNOT_UPDATE_RA_OR_CPF',
        statusCode: 400,
    },
    FAILED_TO_UPDATE_STUDENT: {
        message: 'Failed to update student',
        internalCode: 'FAILED_TO_UPDATE_STUDENT',
        statusCode: 500,
    }
};
