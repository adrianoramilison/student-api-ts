import { Router } from 'express';
import studentController from '../controllers/StudentController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get('/', authenticate, studentController.getAll);
router.get('/:id', authenticate, studentController.getById);
router.post('/', authenticate, studentController.create);
router.put('/:id', authenticate, studentController.replace);
router.patch('/:id', authenticate, studentController.update);
router.delete('/:id', authenticate, studentController.remove);

export default router;