import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import { ApiError } from '../utils/ApiError';
import { UserRole } from '../models/UserModel';

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        email: string;
        role: UserRole;
    };
}

const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new ApiError(
                401,
                'Authorization header is required'
            );
        }

        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new ApiError(
                401,
                'Authorization format must be Bearer <token>'
            );
        }

        const payload = verifyToken(token);

        (req as AuthenticatedRequest).user = {
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        };

        next();

    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
            return;
        }

        next(new ApiError(
            401,
            'Invalid or expired token'
        ));
    }
};

export default authenticate;