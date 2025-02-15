export const ERROR_MESSAGES = {
    INTERNAL_SERVER_ERROR: {
        message: 'Erro interno do servidor',
        internalCode: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
    },
    FIELD_REQUIRED: {
        message: 'Todos os campos são obrigatórios',
        internalCode: 'VALIDATION_ERROR',
        statusCode: 400,
    },
    EMAIL_ALREADY_EXISTS: {
        message: 'Este e-mail já está em uso',
        internalCode: 'EMAIL_ALREADY_EXISTS',
        statusCode: 400,
    },
    RA_ALREADY_EXISTS: {
        message: 'O RA já existe',
        internalCode: 'RA_ALREADY_EXISTS',
        statusCode: 400,
    },
    CPF_ALREADY_EXISTS: {
        message: 'O CPF já existe',
        internalCode: 'CPF_ALREADY_EXISTS',
        statusCode: 400,
    },
    STUDENT_NOT_FOUND: {
        message: 'Estudante não encontrado',
        internalCode: 'STUDENT_NOT_FOUND',
        statusCode: 404,
    },
    EMAIL_NOT_FOUND: {
        message: 'E-mail digitado não foi encontrado',
        internalCode: 'EMAIL_NOT_FOUND',
        statusCode: 404,
    },
    INCORRECT_PASSWORD: {
        message: 'Sua senha está incorreta. Tente novamente',
        internalCode: 'PASSWORD_INCORRECT',
        statusCode: 400,
    },
    CANNOT_UPDATE_RA_OR_CPF: {
        message: 'O RA e o CPF não podem ser alterados',
        internalCode: 'CANNOT_UPDATE_RA_OR_CPF',
        statusCode: 400,
    },
    FAILED_TO_UPDATE_STUDENT: {
        message: 'Falha ao atualizar o estudante',
        internalCode: 'FAILED_TO_UPDATE_STUDENT',
        statusCode: 500,
    },
    TOKEN_MISSING: {
        message: 'Não autorizado. Faça login novamente',
        internalCode: 'TOKEN_MISSING',
        statusCode: 401,
    },
    INVALID_ID: {
        message: 'Id não pode ser menor ou igual a zero',
        internalCode: 'INVALID_ID',
        statusCode: 400,
    },
    INVALID_TOKEN: {
        message: 'Não autorizado. Faça login novamente',
        internalCode: 'INVALID_TOKEN',
        statusCode: 401,
    },
    INVALID_NAME: {
        message: 'O nome deve ter pelo menos 2 caracteres.',
        internalCode: 'INVALID_NAME',
        statusCode: 400,
    },
    INVALID_EMAIL: {
        message: 'O e-mail informado não é válido.',
        internalCode: 'INVALID_EMAIL',
        statusCode: 400,
    },
    INVALID_CPF: {
        message: 'O CPF deve conter exatamente 11 números.',
        internalCode: 'INVALID_CPF',
        statusCode: 400,
    },
    INVALID_PASSWORD: {
        message: 'A senha deve conter pelo menos 8 caracteres, uma letra e um número.',
        internalCode: 'INVALID_PASSWORD',
        statusCode: 400,
    },
};
