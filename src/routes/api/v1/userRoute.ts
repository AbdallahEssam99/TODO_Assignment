import express from 'express';
import {createUser, getAllUsers, getUser,updateUser,deleteUser,userLogin} from '../../../services/userService';


const userRouter = (app: express.Application) => {
    app.get('/api/v1/users', getAllUsers);
    app.get('/api/v1/users/:id', getUser);
    app.post('/api/v1/users', createUser);
    app.patch('/api/v1/users/:id', updateUser);
    app.delete('/api/v1/users/:id', deleteUser);
    app.post('/api/v1/users/login', userLogin);
}
export default userRouter;