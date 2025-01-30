import express from 'express'
import {test, trainUpload} from '../controller/train.controller.js'

const router = express.Router()
router.get('/test',test)
router.post('/upload',trainUpload)
export default router