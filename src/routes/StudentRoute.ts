import { Router } from 'express';
import studentController from '../controllers/StudentController';
import authenticate from '../security/authMiddleware';
import authorize from '../security/authorize';

const router = Router();

router.get(
    '/',
    authenticate,
    studentController.getAll
);

router.get(
    '/:id',
    authenticate,
    studentController.getById
);

router.post(
    '/',
    authenticate,
    authorize('ADMIN'),
    studentController.create
);

router.put(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    studentController.replace
);

router.patch(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    studentController.update
);

router.delete(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    studentController.remove
);

export default router;