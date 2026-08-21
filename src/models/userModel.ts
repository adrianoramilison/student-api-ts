export type UserRole = 'USER' | 'ADMIN';

export interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
}

export type UserInput = Omit<User, 'id'>;