import { studentRepository } from '../repositories/StudentRepository';
import {
    Student,
    StudentInput,
    StudentPartialInput,
    StudentState
} from '../models/StudentModel';
import { ApiError } from '../utils/ApiError';

const validateEmail = (email: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new ApiError(400, 'Invalid email format');
    }
};

const validateState = (state: string): void => {
    if (state !== 'ACTIVE' && state !== 'INACTIVE') {
        throw new ApiError(
            400,
            'state must be ACTIVE or INACTIVE'
        );
    }
};

const validateStudentData = (data: StudentInput): void => {
    const {
        lastName,
        firstName,
        email,
        major,
        state
    } = data;

    if (!lastName || !firstName || !email || !major || !state) {
        throw new ApiError(
            400,
            'lastName, firstName, email, major and state are required'
        );
    }

    validateEmail(email);
    validateState(state);
};

const getAll = (): Student[] => {
    return studentRepository.findAll();
};

const getById = (id: number): Student => {
    const student = studentRepository.findById(id);

    if (!student) {
        throw new ApiError(
            404,
            `Student with id ${id} not found`
        );
    }

    return student;
};

const create = (data: StudentInput): Student => {
    validateStudentData(data);

    return studentRepository.create(data);
};

const replace = (id: number, data: StudentInput): Student => {
    validateStudentData(data);

    const student = studentRepository.replace(id, data);

    if (!student) {
        throw new ApiError(
            404,
            `Student with id ${id} not found`
        );
    }

    return student;
};

const update = (
    id: number,
    data: StudentPartialInput
): Student => {

    if (data.email !== undefined) {
        if (!data.email) {
            throw new ApiError(400, 'Email cannot be empty');
        }

        validateEmail(data.email);
    }

    if (data.state !== undefined) {
        if (!data.state) {
            throw new ApiError(400, 'State cannot be empty');
        }

        validateState(data.state);
    }

    const student = studentRepository.update(id, data);

    if (!student) {
        throw new ApiError(
            404,
            `Student with id ${id} not found`
        );
    }

    return student;
};

const remove = (id: number): void => {
    const deleted = studentRepository.remove(id);

    if (!deleted) {
        throw new ApiError(
            404,
            `Student with id ${id} not found`
        );
    }
};

export default {
    getAll,
    getById,
    create,
    replace,
    update,
    remove
};