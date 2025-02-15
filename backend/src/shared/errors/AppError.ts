import {ERROR_MESSAGES} from './errorMessages';

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly internalCode: string;

    constructor(errorKey: keyof typeof ERROR_MESSAGES) {
        const {message, statusCode, internalCode} = ERROR_MESSAGES[errorKey];
        super(message);
        this.statusCode = statusCode;
        this.internalCode = internalCode;
    }
}
