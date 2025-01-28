import express from 'express'
import {login, OAuth, signout, signup} from '../controller/auth.controller.js'

const router = express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.post('/OAuth',OAuth)
router.delete('/signout',signout)
export default router