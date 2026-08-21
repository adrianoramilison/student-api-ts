import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/UserRepository';
import { generateToken } from '../security/jwt';
import { ApiError } from '../utils/ApiError';

const login = async (
    email: string,
    password: string
): Promise<string> => {

    if (!email || !password) {
        throw new ApiError(
            400,
            'Email and password are required'
        );
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new ApiError(
            401,
            'Invalid email or password'
        );
    }

    const passwordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordValid) {
        throw new ApiError(
            401,
            'Invalid email or password'
        );
    }

    return generateToken(
        user.id,
        user.email,
        user.role
    );
};

export default {
    login
};