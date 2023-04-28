import Sequelize from 'sequelize';
import {Customer} from '../models/index.js';
const Op = Sequelize.Op;

export async function findAllCustomerOrders() {
    const customer_orders=await Customer.findAll({
        include: {
            model: order
        }
    })
    return customer_orders
}

export async function findCustomerByEmail(email) {
    const customer =await Customer.findOne({
        where: {
            email: email 
        },
    })
    return customer
}

export async function updateCustomer(username, email) {
    const customer = await Customer.findOne({
        where: {
            name: username,
        },
    })
    const userr = await customer.update({
        name: username,
        email: email
    })
    return userr
}

export async function findCustomerByUserName() {
    const customer = await Customer.findOne({
        where: {
          name: data.username,
        },
      });
      return customer
}

export async function updatePassword(customer, hashedPassword) {
    const customerr = await customer.update({
        name: username,
        password: hashedPassword,
      });
      return "password reset";
}

export async function updateNewPassword(customerr, hashedPassword) {
    const customer = await customerr.update({
        password: hashedPassword,
      });
      return "Password has been reset"
}

export async function findCustomerById(customer_id){
    const customerr = await Customer.findOne({
        where: {
          customer_id: customer_id,
        },
      });
      return customerr
}

export async function findByNameOrEmail(name, email){
    const customer = Customer.findOne({
        where: {
            [Op.or]: [
                {
                    name,
                },
                { email: email },
            ],
        },
    })
    return customer
}

export async function createCustomer(name, hashedPassword, email, mobile) {
    const user =Customer.create({
        name,
        password: hashedPassword,
        email: email,
        mob_phone: mobile,
      })
      return user
}