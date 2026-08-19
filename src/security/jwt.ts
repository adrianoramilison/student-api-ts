import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export interface JwtPayload {
    userId: number;
    email: string;
}

export const generateToken = (
    userId: number,
    email: string
): string => {

    const options: SignOptions = {
        expiresIn: '1h'
    };

    return jwt.sign(
        {
            userId,
            email
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