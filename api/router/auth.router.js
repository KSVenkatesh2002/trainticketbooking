import express from 'express'
import {login, OAuth, signup} from '../controller/auth.controller.js'

const router = express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.post('/OAuth',OAuth)
export default router