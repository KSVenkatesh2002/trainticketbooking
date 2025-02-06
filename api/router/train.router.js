import express from 'express'
import {bookTicket, searchTrain, test, trainAddressList, trainUpload} from '../controller/train.controller.js'

const router = express.Router()
router.get('/test',test)
router.post('/upload',trainUpload)
router.get('/addresslist',trainAddressList)
router.post('/search',searchTrain)
router.post('/book-ticket',bookTicket)
export default router