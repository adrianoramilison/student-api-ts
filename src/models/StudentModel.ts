export type StudentState = 'ACTIVE' | 'INACTIVE';

export interface Student {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    major: string;
    state: StudentState;
}

export type StudentInput = Omit<Student, 'id'>;

export type StudentPartialInput = Partial<StudentInput>;