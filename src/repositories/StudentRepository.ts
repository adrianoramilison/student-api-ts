import {
    Student,
    StudentInput,
    StudentPartialInput
} from '../models/StudentModel';

export interface StudentRepository {
    findAll(): Student[];
    findById(id: number): Student | undefined;
    create(data: StudentInput): Student;
    replace(id: number, data: StudentInput): Student | null;
    update(id: number, data: StudentPartialInput): Student | null;
    remove(id: number): boolean;
}

class InMemoryStudentRepository implements StudentRepository {

    private students: Student[] = [
        {
            id: 1,
            lastName: 'Rakoto',
            firstName: 'Adri',
            email: 'adri@gmail.com',
            major: 'Computer Science',
            state: 'ACTIVE'
        },
        {
            id: 2,
            lastName: 'Rabe',
            firstName: 'Fara',
            email: 'fara@gmail.com',
            major: 'Networking',
            state: 'ACTIVE'
        }
    ];

    private nextId = 3;

    findAll(): Student[] {
        return this.students;
    }

    findById(id: number): Student | undefined {
        return this.students.find(student => student.id === id);
    }

    create(data: StudentInput): Student {
        const student: Student = {
            id: this.nextId++,
            ...data
        };

        this.students.push(student);
        return student;
    }

    replace(id: number, data: StudentInput): Student | null {
        const index = this.students.findIndex(student => student.id === id);

        if (index === -1) {
            return null;
        }

        const student: Student = {
            id,
            ...data
        };

        this.students[index] = student;
        return student;
    }

    update(id: number, data: StudentPartialInput): Student | null {
        const index = this.students.findIndex(student => student.id === id);

        if (index === -1) {
            return null;
        }

        this.students[index] = {
            ...this.students[index],
            ...data
        };

        return this.students[index];
    }

    remove(id: number): boolean {
        const index = this.students.findIndex(student => student.id === id);

        if (index === -1) {
            return false;
        }

        this.students.splice(index, 1);
        return true;
    }
}

export const studentRepository: StudentRepository =
    new InMemoryStudentRepository();