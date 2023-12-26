import express from 'express'
const router = express.Router()
import { findOrder } from '../controllers/orderdetails-controller.js'


router.get('/:orderid', findOrder)

export default router
