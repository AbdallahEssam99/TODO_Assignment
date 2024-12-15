import {Router} from 'express';
import { getAllTodos,getTodo,createTodo,updateTodo,deleteTodo,getUserTodos} from '../../../services/todoSevice';

const router = Router();

router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.get('/user/:id', getUserTodos);

export default router;