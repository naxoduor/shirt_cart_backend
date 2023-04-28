import express from 'express'
const router = express.Router()
import { findOrderById } from '../db/orderdetails.js'


router.get('/:id', async (req, res) => {
const orderid=req.params.id
try {
    const order = await findOrderById(orderid)
    return order
}
catch(e){
    console.log(e)
}
})

export default router
