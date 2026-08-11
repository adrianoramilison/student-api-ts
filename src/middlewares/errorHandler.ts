import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

const errorHandler = (err: ApiError | Error, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const message = err instanceof ApiError ? err.message : 'Internal server error';

    console.error(`[ERROR ${statusCode}] ${err.message}`);

    res.status(statusCode).json({
        error: message,
        statusCode,
    });
};

export default errorHandler;