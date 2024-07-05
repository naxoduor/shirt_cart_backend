import {Order} from '../models/index.js'

export async function findOrderById(orderid) {
    return await Order.findOne({
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
}

export async function findOrderDetailsByOrderId() {
    
}