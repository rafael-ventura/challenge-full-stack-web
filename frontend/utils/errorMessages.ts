export const errorMessages: Record<string, string> = {
    "VALIDATION_ERROR": "Preencha todos os campos obrigatórios.",
    "EMAIL_ALREADY_EXISTS": "Este e-mail já está cadastrado.",
    "INVALID_CPF": "O CPF informado não é válido.",
    "INVALID_RA": "O RA informado não é válido."
};

export const getErrorMessage = (internalCode: string, defaultMessage: string): string => {
    return errorMessages[internalCode] || defaultMessage;
};
