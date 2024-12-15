import {TODO} from '../associations';
import {Request, Response } from 'express';
// import Op from 'sequelize';

const getAllTodos = async(req:Request,res:Response) => {
    try{
        const allTodos = await TODO.findAll();
        res.status(200).json(allTodos);
    }catch(err){
        throw new Error(`${err}`);
    }
}

const getTodo = async(req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const newTodo = await TODO.findByPk(id);
        if (newTodo) {
            res.status(200).json(newTodo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    }catch(err){
        throw new Error(`${err}`);
    }
}

const createTodo = async(req:Request,res:Response) => {
    try{
        const {title, description, dueDate, completed, userId} = req.body;
        const newTodo = await TODO.create({title, description, dueDate, completed, userId});
        res.status(201).json(newTodo);
    }catch(err){
        throw new Error(`${err}`);
    }
}

const updateTodo = async(req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const {title, description, dueDate, completed} = req.body;
        const updatedTodo = await TODO.update({title, description, dueDate, completed}, {where: {id}});
        if (updatedTodo[0]) {
            res.status(200).json({ message: 'Todo updated successfully' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    }catch(err){
        throw new Error(`${err}`);
    }
}

const deleteTodo = async(req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const deletedTodo = await TODO.destroy({where: {id}});
        if (deletedTodo) {
            res.status(200).json({ message: 'Todo deleted successfully' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    }catch(err){
        throw new Error(`${err}`);
    }
}

const getUserTodos = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const { sortBy = 'id', order = 'asc' } = req.query;

        // Validate `order` and fallback to default if invalid
        const validOrder = order === 'asc' || order === 'desc' ? order : 'asc';

        // Validate `sortBy` against allowed columns to prevent SQL injection
        const allowedSortBy = ['id', 'title', 'dueDate', 'completed'];
        const columnToSortBy = allowedSortBy.includes(sortBy as string) ? sortBy : 'id';

        // Fetch todos with sorting
        const userTodos = await TODO.findAll({
            where: { userId },
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt'],
            },
            order: [[columnToSortBy, validOrder]], // Dynamic sorting
        });

        res.status(200).json(userTodos);
    } catch (err) {
        throw new Error(`${err}`);
    }
};


export {getAllTodos, getTodo, createTodo, updateTodo, deleteTodo, getUserTodos};