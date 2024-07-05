import Sequelize from 'sequelize';
import {Customer} from '../models/index.js';
const Op = Sequelize.Op;

export async function findAllCustomerOrders() {
    return await Customer.findAll({
        include: {model: order}
    })
}

export async function findCustomerByEmail(email) {
    return await Customer.findOne({
        where: {email},
    })
}

export async function updateCustomer(name, email) {
    const customer = await Customer.findOne({
        where: {name,},
    })

    return await customer.update({name,email})
}


export async function updatePassword(customer, password) {
    await customer.update({
        password,
      });
      return "password reset";
}

export async function updateNewPassword(customerr, password) {
    await customerr.update({password,});
      return "Password has been reset"
}

export async function findCustomerById(customer_id){
    return await Customer.findOne({
        where: {customer_id},
      });
}

export async function findByNameOrEmail(name, email){
    return Customer.findOne({
        where: {
            [Op.or]: [
                {name},
                {email},
            ],
        },
    })
}

export async function createCustomer(name, password, email, mobile) {
    return Customer.create({name,password,email,mobile})
}