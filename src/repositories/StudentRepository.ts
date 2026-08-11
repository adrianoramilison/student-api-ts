import { Student, StudentInput, StudentPartialInput } from '../models/StudentModel';

export interface StudentRepository {
    findAll(): Student[];
    findById(id: number): Student | undefined;
    create(data: StudentInput): Student;
    replace(id: number, data: StudentInput): Student | null;
    update(id: number, data: StudentPartialInput): Student | null;
    remove(id: number): boolean;
}

export class InMemoryStudentRepository implements StudentRepository {
    private students: Student[] = [
        { id: 1, lastName: 'Rakoto', firstName: 'Adri', major: 'Computer Science' },
        { id: 2, lastName: 'Rabe', firstName: 'Fara', major: 'Networking' },
    ];
    private nextId = 3;

    findAll(): Student[] {
        return this.students;
    }

    findById(id: number): Student | undefined {
        return this.students.find((s) => s.id === id);
    }

    create({ lastName, firstName, major }: StudentInput): Student {
        const newStudent: Student = { id: this.nextId++, lastName, firstName, major };
        this.students.push(newStudent);
        return newStudent;
    }

    replace(id: number, { lastName, firstName, major }: StudentInput): Student | null {
        const student = this.findById(id);
        if (!student) return null;

        student.lastName = lastName;
        student.firstName = firstName;
        student.major = major;
        return student;
    }

    update(id: number, fields: StudentPartialInput): Student | null {
        const student = this.findById(id);
        if (!student) return null;

        if (fields.lastName !== undefined) student.lastName = fields.lastName;
        if (fields.firstName !== undefined) student.firstName = fields.firstName;
        if (fields.major !== undefined) student.major = fields.major;
        return student;
    }

    remove(id: number): boolean {
        const index = this.students.findIndex((s) => s.id === id);
        if (index === -1) return false;

        this.students.splice(index, 1);
        return true;
    }
}

export const studentRepository: StudentRepository = new InMemoryStudentRepository();