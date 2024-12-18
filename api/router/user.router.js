import express from 'express'
import {deleteUser, test, updateUser} from '../controller/user.controller.js'

const router = express.Router()
router.get('/test',test)
router.get('/update',updateUser)
router.get('/delete',deleteUser)
export default router
