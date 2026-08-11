import { Router } from 'express';
import studentController from '../controllers/StudentController';

const router = Router();

router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.post('/', studentController.create);
router.put('/:id', studentController.replace);
router.patch('/:id', studentController.update);
router.delete('/:id', studentController.remove);

export default router;