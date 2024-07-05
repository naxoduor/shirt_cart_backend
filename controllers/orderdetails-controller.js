import express from 'express'
const router = express.Router()
import { findOrderById } from '../db/orderdetails.js'

export const findOrder  = async (req, res) => {
try {
    res.send(await findOrderById(req.params.orderid))
}
catch(e){
    console.log(e)
}
}

