import { studentRepository } from '../repositories/StudentRepository';
import {
    Student,
    StudentInput,
    StudentPartialInput
} from '../models/StudentModel';
import { ApiError } from '../utils/ApiError';

const validateEmail = (email: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new ApiError(400, 'Invalid email format');
    }
};

const validateStudentData = (data: StudentInput): void => {
    const { lastName, firstName, email, major } = data;

    if (!lastName || !firstName || !email || !major) {
        throw new ApiError(
            400,
            'lastName, firstName, email and major are required'
        );
    }

    validateEmail(email);
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