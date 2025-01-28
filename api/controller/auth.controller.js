import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
export const signup = async (req,res,next) =>{
    const {username, dob, email, password } = req.body
    const validUsername = await User.findOne({username})
    const validEmail = await User.findOne({email})
    if(validUsername) return next(errorHandler(404,'username not available'))
    if(validEmail) return next(errorHandler(404,'email already exist'))
    try{
        const hashedpassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({username,dob,email,password: hashedpassword})
        await newUser.save();
        res
            .status(201)
            .json({message : 'user createdd successfully '})
    }
    catch(error){
        next(error)
    }
}

export const login = async (req,res,next) =>{
    const {username, password } = req.body
    try{
        const validUser = await User.findOne({username})
        if(!validUser) return next(errorHandler(404,'user not found'))
        const vaildPassword = bcryptjs.compareSync(password,validUser.password)
        if(!vaildPassword) return next(errorHandler(401,'wrong creditenal'))
        const token = jwt.sign({id:validUser._id}, process.env.JWT)
        const {password:pass, ...other} = validUser._doc
        const expiryDate = new Date(Date.now()+3600000)
        res.
            cookie('access_token',token,{
                httpOnly:true,
                expires:expiryDate
            })
            .status(200)
            .json({other})
    }
    catch(error){
        next(error)
    }
}

export const OAuth = async (req,res,next) =>{
    const {username, email, photoURL} = req.body
    const dob = "OAuth"
    try{
        const validEmail = await User.findOne({email})
        if(validEmail){
            const token = jwt.sign({id:validEmail._id}, process.env.JWT)
            const {password:pass, ...other} = validEmail._doc
            const expiryDate = new Date(Date.now()+3600000)
            res.
                cookie('access_token',token,{
                    httpOnly:true,
                    expires:expiryDate
                })
                .status(200)
                .json({other})
        }
        else{
            const generatedRandomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const newUser = new User({
                username:username + Math.floor(Math.random()*10000).toString(),
                dob,
                email,
                password:generatedRandomPassword,photoURL
            })
            await newUser.save();
            const token = jwt.sign({id:newUser._id}, process.env.JWT)
            const {password:pass, ...other} = newUser._doc
            const expiryDate = new Date(Date.now()+3600000)
            res.
                cookie('access_token',token,{
                    httpOnly:true,
                    expires:expiryDate
                })
                .status(200)
                .json({other})
        }
    }catch(error){
        next(error)
    }
}

export const signout = async (req,res,next) =>{
    res.clearCookie('access_token')
    res.status(200).json({message:'signout successfully'})
}