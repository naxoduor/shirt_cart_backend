import Sequelize from 'sequelize';
import {Customer} from '../models/index.js';
const Op = Sequelize.Op;

export async function findAllCustomerOrders() {
    const customer_orders=await Customer.findAll({
        include: {model: order}
    })
    return customer_orders
}

export async function findCustomerByEmail(email) {
    const customer =await Customer.findOne({
        where: {email},
    })
    return customer
}

export async function updateCustomer(name, email) {
    const customer = await Customer.findOne({
        where: {name,},
    })

    const userr = await customer.update({name,email})
    return userr
}

// export async function findCustomerByUserName() {

//     const customer = await Customer.findOne({
//         where: {
//           name: data.username,
//         },
//       });
//       return customer
// }

export async function updatePassword(customer, password) {
    const customerr = await customer.update({
        password,
      });
      return "password reset";
}

export async function updateNewPassword(customerr, password) {
    const customer = await customerr.update({password,});
      return "Password has been reset"
}

export async function findCustomerById(customer_id){
    const customerr = await Customer.findOne({
        where: {customer_id},
      });
      return customerr
}

export async function findByNameOrEmail(name, email){
    const customer = Customer.findOne({
        where: {
            [Op.or]: [
                {name},
                {email},
            ],
        },
    })
    return customer
}

export async function createCustomer(name, password, email, mobile) {
    const user =Customer.create({name,password,email,mobile})
    return user
}