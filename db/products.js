import {Category} from '../models/index.js'
import {Product} from '../models/index.js';
import { Op } from 'sequelize';


export async function getAllProducts()  {
    return await Product.findAll({
      where: { display: 0 },
    })
  }

  export async function getAllProductsAsAdmin()  {
    return await Product.findAll({
      where: { display: 1 },
    })
  }

export async function getProductByPk(product_id) {
  return await Product.findByPk(product_id)

}

export async function getTotalProductsCount() {
  return await Product.count()
}

export async function getPaginationProducts(page, pageSize){
  let  offset=page * pageSize
  return await Product.findAll({
    offset,
    limit: pageSize
  })

}

export async function searchProducts(searchParam) {

  return Product.findAll({
    where: {
      name: {
        [Op.like]: `%${searchParam}%`
      }
    }
  })
  
  
}

export async function getByDepartmentId(department_id) {
  return await Product.findAll({
    include: [{model: Category, where: { department_id},}],
    where: { display: 0 },
    offset: 1,
    limit: 8
  })
}

// const page = 1
// const pageSize = 2
// const offset = page * pageSize
// const limit = offset + pageSize


export async function getByCategoryId(category_id) {
  return await Product.findAll({
    include: [{model: Category,where: {category_id},}],
    where: { display: 0 },
    offset: 1,
    limit: 8
  })
}

export async function getProductsByCategoryByPagination(category_id, limit, offset){
  
    return await Product.findAll({
      include: [{model: Category,where: { category_id},}],
      where: { display: 0 },
      offset,
      limit
    })
}

export async function getProductsByDepartmentByPagination(department_id, limit, offset) {
    return await Product.findAll({
      include: [{model: Category, where: { department_id},}],
      where: { display: 0 },
      offset,
      limit
    })
}
 
export async function getSearchProducts(searchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem) {
  return await Product.findAll({
    where: Sequelize.literal('MATCH (name, description) AGAINST (:searchString)'),
    replacements: {searchString}
  })
}

export async function setRabbitQueues() {
  const products = await Product.findAll({
    include: [{model: Category,where: { department_id: inDepartmentId },}],
    offset: 1,
    limit: 8
  })

  amqp.connect('amqp://localhost', function(error0, connection){
  if(error0){
      throw error0;
  }

  connection.createChannel(function(error1, channel){
      if(error1){
          throw error1;
      }
      var queue = 'hello';
      var msg = JSON.stringify(products);

      channel.assertQueue(queue, {durable: false});
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg)
  })
  setTimeout(function() {
      connection.close();
      process.exit(0);
  }, 500);
})
return "Success"
}

export async function f() {

}
export async function addProduct(name, description, price, discounted_price,delivery_cost,image, image_2, thumbnail, display)
 {
  return Product.create({name,description,price,discounted_price,delivery_cost,image,image_2,thumbnail,display})
  }

export async function updateProduct(product_id, name, description, price, discounted_price,delivery_cost,image, image_2, thumbnail, display) {
  
  const entry = await Product.findByPk(product_id)

  return await entry.update({name,description,price,discounted_price,delivery_cost,image,image_2,thumbnail,display,});
  
}