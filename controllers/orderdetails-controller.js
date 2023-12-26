import express from 'express'
const router = express.Router()
import { findOrderById } from '../db/orderdetails.js'

export const findOrder  = async (req, res) => {
const {orderid}=req.params
try {
    const order = await findOrderById(orderid)
    return order
}
catch(e){
    console.log(e)
}
}

