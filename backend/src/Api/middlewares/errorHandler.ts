import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message,
            internalCode: err.internalCode,
        });
        return;
    }

    console.error('Unexpected error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        internalCode: 'INTERNAL_SERVER_ERROR',
    });
}
