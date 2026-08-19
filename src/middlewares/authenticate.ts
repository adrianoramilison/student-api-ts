import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../security/jwt';
import { ApiError } from '../utils/ApiError';

const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new ApiError(401, 'Authorization header missing');
        }

        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new ApiError(401, 'Invalid authorization format');
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();
    } catch (error) {
        next(new ApiError(401, 'Invalid or expired token'));
    }
};

export default authenticate;