import { pool } from '../config/database';
import { User, UserInput } from '../models/userModel';

export interface UserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    create(data: UserInput): Promise<User>;
}

class PostgreSQLUserRepository implements UserRepository {

    async findByEmail(email: string): Promise<User | undefined> {
        const result = await pool.query(
            `SELECT id, email, password, role
             FROM users
             WHERE email = $1`,
            [email]
        );

        return result.rows[0];
    }

    async create(data: UserInput): Promise<User> {
        const result = await pool.query(
            `INSERT INTO users (email, password, role)
             VALUES ($1, $2, $3)
             RETURNING id, email, password, role`,
            [data.email, data.password, data.role]
        );

        return result.rows[0];
    }
}

export const userRepository: UserRepository =
    new PostgreSQLUserRepository();