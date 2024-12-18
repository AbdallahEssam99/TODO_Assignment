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
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid user ID format' });
            return;
        }
        const sort = req.query.sort as string | undefined;
        const isCompleted = req.query.completed as string | undefined;
        const page = req.query.page as string|undefined || 1 ;
        const pageSize = req.query.limit as string|undefined || 2;

        const validSortColumns = ['dueDate'];
        const validSortDirections = ['asc', 'desc'];

        const whereQuery: { userId: number; completed?: boolean } = { userId: id };
        const orderArr: [string, string][] = [];

        if (sort) {
            const sortFields = sort.split(',');

            for (const field of sortFields) {
                const [column, direction] = field.split(':');
                // Validate column and direction
                if (column && direction && validSortColumns.includes(column) && validSortDirections.includes(direction?.toLowerCase())) {
                    orderArr.push([column, direction]);
                }
            }
        }

        // Add default sorting if no valid columns were provided
        if (orderArr.length === 0) {
            orderArr.push(['id', 'asc']);
        }

        if (isCompleted) {
            if (isCompleted === 'true') {
                whereQuery['completed'] = true; // Filter for completed todos
            } else if (isCompleted === 'false') {
                whereQuery['completed'] = false; // Filter for incomplete todos
            }
            else{
                res.status(400).json({ message: 'Invalid completed status format' });
                return;
            }
        }

        const todos = await TODO.findAll({
            where: whereQuery,
            order: orderArr,
            limit: parseInt(pageSize as string) ,
            offset: (parseInt(page as string) - 1) * parseInt(pageSize as string),
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
            
        });

        if (!todos || todos.length === 0) {
            res.status(404).json({ message: 'No todos found for the user' });
            return;
        }

        res.status(200).json(todos);
    
    }catch(err){
        throw new Error(`${err}`);
    }
    
};


export {getAllTodos, getTodo, createTodo, updateTodo, deleteTodo, getUserTodos};