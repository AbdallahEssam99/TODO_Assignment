import {User} from '../associations';
import {Request, Response } from 'express';


const getUser = async(req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const newUser = await User.findByPk(id);
        if (newUser) {
            res.status(200).json(newUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }catch(err){
        throw new Error(`${err}`);
    }
}

const getAllUsers = async(req:Request,res:Response) => {
    try{
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
    }catch(err){
        throw new Error(`${err}`);
    }
}


const createUser = async(req:Request,res:Response) => {
    try{
        const {firstName, lastName, password, email, dateOfBirth} = req.body;
        const newUser = await User.create({firstName, lastName, password, email, dateOfBirth});
        res.status(201).json(newUser);
    }catch(err){
        throw new Error(`${err}`);
    }

}

const updateUser = async(req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const {firstName, lastName, password, email, dateOfBirth} = req.body;
        const updatedUser = await User.update({firstName, lastName, email, password, dateOfBirth}, {where: {id}});
        if (updatedUser[0]) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }catch(err){
        throw new Error(`${err}`);
    }
}

const deleteUser = async(req:Request, res:Response) => {
    try{
        const id = req.params.id;
        const deletedUser = await User.destroy({where: {id}});
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }catch(err){
        throw new Error(`${err}`);
    }
}

const userLogin = async(req:Request, res:Response) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ where: {email}});
        if (!user || (user.password !== password)) {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        else{
            res.status(200).json({ message: 'Logged in successfully'});
        }
        // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.json({ user, token });
    }catch(err){
        throw new Error(`${err}`);
    }
}
export {createUser, getAllUsers, getUser,updateUser,deleteUser,userLogin};