import User from '../models/user.model.js';

export const test = (req,res) => {  
    res.json({
        message : 'test request complete'
    });
};
export const updateUser = (req,res) => {
    res.json({
        message : 'update request complete'
    });
};
export const deleteUser = (req,res) => {  
    res.json({
        message : 'delete request complete'
    });
};