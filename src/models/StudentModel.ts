export interface Student{
    id: number;
    lastName: string;
    firstName: string;
    major: string;
}


export type StudentInput = Omit<Student, 'id'>;
export type StudentPartialInput = Partial<StudentInput>;