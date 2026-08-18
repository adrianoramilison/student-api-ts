import { Request, Response, NextFunction } from 'express';
import studentService from '../services/StudentService';
import { StudentInput, StudentPartialInput } from '../models/StudentModel';

const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const students = await studentService.getAll();
        res.status(200).json(students);
    } catch (err) {
        next(err);
    }
};

const getById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const student = await studentService.getById(Number(req.params.id));
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

const create = async (
    req: Request<{}, {}, StudentInput>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const student = await studentService.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        next(err);
    }
};

const replace = async (
    req: Request<{ id: string }, {}, StudentInput>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const student = await studentService.replace(
            Number(req.params.id),
            req.body
        );

        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

const update = async (
    req: Request<{ id: string }, {}, StudentPartialInput>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const student = await studentService.update(
            Number(req.params.id),
            req.body
        );

        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await studentService.remove(Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
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