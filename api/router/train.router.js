import express from 'express'
import { searchTrain, test, trainAddressList, trainUpload, getAvailableSeats, bookTicket, payment, getPnr, getMyBooking} from '../controller/train.controller.js'

const router = express.Router()
router.get('/test', test)
router.post('/upload', trainUpload)
router.get('/address-list', trainAddressList)
router.get('/search', searchTrain)
router.get('/available-seats', getAvailableSeats)
router.post('/book-ticket',bookTicket)
router.post('/book-ticket/payment',payment)
router.get('/get-pnr-status',getPnr)
router.get('/get-my-booking/:userId',getMyBooking)

export default router