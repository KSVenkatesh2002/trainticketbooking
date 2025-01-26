import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const test = (req,res) => {  
    res.json({
        message : 'test request complete'
    });
};
export const updateUser = async (req,res) => {
    const {username, email, dob, password} = req.body;
    res.json({
        message : 'update request complete'
    });
};
export const deleteUser = (req,res) => {  
    res.json({
        message : 'delete request complete'
    });
};