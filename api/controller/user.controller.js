import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const test = (req,res) => {  
    res.json({
        message : 'test request complete'
    });
};
export const update = async (req,res,next) => {
    if(req.user.id!==req.params.id) return next(errorHandler(401, 'you can update only your account'))
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    ...req.body, 
                    ...(req.body.password && { password: bcryptjs.hashSync(req.body.password, 10) })
                }
            },
            {new: true}
        )
        const {password, ...other} = updatedUser._doc
        res.status(200).json(other);
    } catch (error) { next(error); }
};
export const deleteAcc = (req,res) => {  
    res.json({
        message : 'delete request complete'
    });
};