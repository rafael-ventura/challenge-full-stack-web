import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {AppError} from "../../shared/errors/AppError";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("TOKEN_MISSING");
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        req.body.user = decoded;
        return next();
    } catch {
        throw new AppError("INVALID_TOKEN");
    }
}
