import { Response, NextFunction } from 'express';
import { UserRole } from '../models/UserModel';
import { ApiError } from '../utils/ApiError';
import { AuthenticatedRequest } from './authMiddleware';

const authorize = (...allowedRoles: UserRole[]) => {
    return (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): void => {

        if (!req.user) {
            next(new ApiError(
                401,
                'Authentication required'
            ));
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            next(new ApiError(
                403,
                'Access denied'
            ));
            return;
        }

        next();
    };
};

export default authorize;