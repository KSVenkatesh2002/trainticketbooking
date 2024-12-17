import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'
export const signup = async (req,res,next) =>{
    const {username, email, password } = req.body
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username,email,password:hashedpassword})
    try{
        await newUser.save();
        res.status(201).json({message : 'user createdd successfully '})
    }
    catch(error){
        next(error)
    }
}

export const signin = async (req,res,next) =>{
    const {username, password } = req.body
    const validUser = await User.findOne({username})
    console.log('valid user \n\t',validUser)
    console.log('valid user doc\n\t',validUser._doc)
    if(!validUser) return next(createError(404,'user not found'))
    const isCorrect = bcryptjs.compareSync(password,validUser.password)
    if(!isCorrect) return next(createError(400,'wrong creditenal'))
    const token = jwt.sign({id:validUser._id}, process.env.JWT)
    const {password:pass, ...other} = validUser._doc
    const expiryDate = new Date(Date.now()+3600000)
    try{
        res.
        cookie('access_token',token,{
            httpOnly:true,
            expires:expiryDate
        }).
        status(201).json({other})
    }
    catch(error){
        next(error)
    }
}