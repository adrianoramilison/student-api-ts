import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import authService from '../services/AuthService';
import { userRepository } from '../repositories/UserRepository';
import { ApiError } from '../utils/ApiError';

const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(
                400,
                'Email and password are required'
            );
        }

        const existingUser =
            await userRepository.findByEmail(email);

        if (existingUser) {
            throw new ApiError(
                409,
                'Email already exists'
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.create({
            email,
            password: hashedPassword,
            role: 'USER'
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            role: user.role
        });

    } catch (err) {
        next(err);
    }
};

const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        const token = await authService.login(
            email,
            password
        );

        res.status(200).json({
            token
        });

    } catch (err) {
        next(err);
    }
};

export default {
    register,
    login
};