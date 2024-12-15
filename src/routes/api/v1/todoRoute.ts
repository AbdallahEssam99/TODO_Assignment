import express from 'express';
import { getAllTodos,getTodo,createTodo,updateTodo,deleteTodo,getUserTodos} from '../../../services/todoSevice';

const todoRouter = (app: express.Application) => {

  app.get('/api/v1/todos', getAllTodos);
  app.get('/api/v1/todos/:id', getTodo);
  app.post('/api/v1/todos', createTodo);
  app.patch('/api/v1/todos/:id', updateTodo);
  app.delete('/api/v1/todos/:id', deleteTodo);
  app.get('/api/v1/users/:userId/todos', getUserTodos);

}

export default todoRouter;