import { JwtPayload } from '../security/jwt';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export {};