import express from 'express'
import {deleteAcc, test, update} from '../controller/user.controller.js'
import verifyToken from '../utils/verifyToken.js'

const router = express.Router()
router.get('/test',test)
router.post('/update/:id',verifyToken,update)
router.delete('/delete',deleteAcc)
export default router
