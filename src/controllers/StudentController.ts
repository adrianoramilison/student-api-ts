import { Request, Response, NextFunction } from 'express';
import studentService from '../services/StudentService';
import { StudentInput, StudentPartialInput } from '../models/StudentModel';

const getAll = (req: Request, res: Response): void => {
    res.status(200).json(studentService.getAll());
};

const getById = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const student = studentService.getById(Number(req.params.id));
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

const create = (req: Request<{}, {}, StudentInput>, res: Response, next: NextFunction): void => {
    try {
        const student = studentService.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        next(err);
    }
};

const replace = (req: Request<{ id: string }, {}, StudentInput>, res: Response, next: NextFunction): void => {
    try {
        const student = studentService.replace(Number(req.params.id), req.body);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

const update = (req: Request<{ id: string }, {}, StudentPartialInput>, res: Response, next: NextFunction): void => {
    try {
        const student = studentService.update(Number(req.params.id), req.body);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
    try {
        studentService.remove(Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export default { getAll, getById, create, replace, update, remove };