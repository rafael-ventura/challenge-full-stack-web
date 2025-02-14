export const ERROR_MESSAGES = {
    INTERNAL_SERVER_ERROR: {
        message: 'Internal Server Error',
        internalCode: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
    },
    FIELD_REQUIRED: {
        message: 'All fields are required',
        internalCode: 'VALIDATION_ERROR',
        statusCode: 400,
    },
    EMAIL_ALREADY_EXISTS: {
        message: 'This email is already in use',
        internalCode: 'EMAIL_ALREADY_EXISTS',
        statusCode: 400,
    },
    RA_ALREADY_EXISTS: {
        message: 'RA already exists',
        internalCode: 'RA_ALREADY_EXISTS',
        statusCode: 400,
    },
    CPF_ALREADY_EXISTS: {
        message: 'CPF already exists',
        internalCode: 'CPF_ALREADY_EXISTS',
        statusCode: 400,
    },
    STUDENT_NOT_FOUND: {
        message: 'Student not found',
        internalCode: 'STUDENT_NOT_FOUND',
        statusCode: 404,
    },
    EMAIL_NOT_FOUND: {
        message: 'Typed email was not found',
        internalCode: 'EMAIL_NOT_FOUND',
        statusCode: 404,
    },
    PASSWORD_INCORRECT: {
        message: 'Your password is incorrect. Please try again',
        internalCode: 'PASSWORD_INCORRECT',
        statusCode: 400,
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
    },
    TOKEN_MISSING: {
        message: 'Unauthorized. Please login again',
        internalCode: 'TOKEN_MISSING',
        statusCode: 401,
    },
    INVALID_TOKEN: {
        message: 'Unauthorized. Please login again',
        internalCode: 'INVALID_TOKEN',
        statusCode: 401,
    },
    INVALID_NAME: {
        message: 'The name must have at least 2 characters.',
        internalCode: 'INVALID_NAME',
        statusCode: 400,
    },
    INVALID_EMAIL: {
        message: 'The email provided is not valid.',
        internalCode: 'INVALID_EMAIL',
        statusCode: 400,
    },
    INVALID_CPF: {
        message: 'The CPF must contain exactly 11 numbers.',
        internalCode: 'INVALID_CPF',
        statusCode: 400,
    }
};
