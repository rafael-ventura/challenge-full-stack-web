export const errorMessages: Record<string, string> = {
    "All fields are required": "Preencha todos os campos obrigatórios.",
    "Email already exists": "Este e-mail já está cadastrado.",
    "RA already exists": "Este RA já está cadastrado.",
};

export const getErrorMessage = (internalCode: string, defaultMessage: string): string => {
    return errorMessages[internalCode] || defaultMessage;
};
