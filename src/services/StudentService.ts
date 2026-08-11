import { studentRepository } from '../repositories/StudentRepository';
import { Student, StudentInput, StudentPartialInput } from '../models/StudentModel';
import { ApiError } from '../utils/ApiError';

const getAll = (): Student[] => {
    return studentRepository.findAll();
};

const getById = (id: number): Student => {
    const student = studentRepository.findById(id);
    if (!student) {
        throw new ApiError(404, `Student with id ${id} not found`);
    }
    return student;
};

const create = (data: StudentInput): Student => {
    const { lastName, firstName, major } = data;
    if (!lastName || !firstName || !major) {
        throw new ApiError(400, 'lastName, firstName and major are required');
    }
    return studentRepository.create(data);
};

const replace = (id: number, data: StudentInput): Student => {
    const { lastName, firstName, major } = data;
    if (!lastName || !firstName || !major) {
        throw new ApiError(400, 'PUT requires the full resource: lastName, firstName and major');
    }

    const student = studentRepository.replace(id, data);
    if (!student) {
        throw new ApiError(404, `Student with id ${id} not found`);
    }
    return student;
};

const update = (id: number, data: StudentPartialInput): Student => {
    const student = studentRepository.update(id, data);
    if (!student) {
        throw new ApiError(404, `Student with id ${id} not found`);
    }
    return student;
};

const remove = (id: number): void => {
    const deleted = studentRepository.remove(id);
    if (!deleted) {
        throw new ApiError(404, `Student with id ${id} not found`);
    }
};

export default { getAll, getById, create, replace, update, remove };