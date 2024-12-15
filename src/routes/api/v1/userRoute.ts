import {Router} from 'express';
import {createUser, getAllUsers, getUser,updateUser,deleteUser,userLogin} from '../../../services/userService';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', userLogin);

export default router;