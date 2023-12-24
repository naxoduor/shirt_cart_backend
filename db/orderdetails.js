import {Order} from '../models/index.js'

export async function findOrderById(orderid) {
    const orderdetails = await Order.findOne({
        include: [
            {
            model:customer,
          },
        {
            model:order_detail
        }],
        where:{
            order_id: orderid
        }
     })
    return orderdetails;
}

export async function findOrderDetailsByOrderId() {
    
}