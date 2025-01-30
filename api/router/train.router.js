import express from 'express'
import {searchTrain, test, trainAddressList, trainUpload} from '../controller/train.controller.js'

const router = express.Router()
router.get('/test',test)
router.post('/upload',trainUpload)
router.get('/addresslist',trainAddressList)
router.get('/search',searchTrain)
export default router