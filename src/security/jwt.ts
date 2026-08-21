import jwt, { SignOptions } from 'jsonwebtoken';
import { UserRole } from '../models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export interface JwtPayload {
    userId: number;
    email: string;
    role: UserRole;
}

export const generateToken = (
    userId: number,
    email: string,
    role: UserRole
): string => {

    const options: SignOptions = {
        expiresIn: '1h'
    };

    return jwt.sign(
        {
            userId,
            email,
            role
        },
        JWT_SECRET,
        options
    );
};

export const verifyToken = (
    token: string
): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
};