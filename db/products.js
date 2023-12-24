import {Category} from '../models/index.js'
import {Product} from '../models/index.js';

export async function getAllProducts()  {
    const products=await Product.findAll({
      where: { display: 0 },
    })
    return products
  }


  export async function getAllProductsAsAdmin()  {
    const products=await Product.findAll({
      where: { display: 1 },
    })
    return products
  }


export async function getByDepartmentId(department_id) {
  const products= await Product.findAll({
    include: [{model: Category, where: { department_id},}],
    where: { display: 0 },
    offset: 1,
    limit: 8
  })
  return products
}

export async function getByCategoryId(category_id) {
  const products = await Product.findAll({
    include: [{model: Category,where: {category_id},}],
    where: { display: 0 },
    offset: 1,
    limit: 8
  })
  return products
}

export async function getProductsByCategoryByPagination(category_id, limit, offset){
  
    const products = await Product.findAll({
      include: [{model: Category,where: { category_id},}],
      where: { display: 0 },
      offset,
      limit
    })
    return products
}

export async function getProductsByDepartmentByPagination(department_id, limit, offset) {
    const products = await Product.findAll({
      include: [{model: Category, where: { department_id},}],
      where: { display: 0 },
      offset,
      limit
    })
    return products
}
 
export async function getSearchProducts(searchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem) {
  const products = await Product.findAll({
    where: Sequelize.literal('MATCH (name, description) AGAINST (:searchString)'),
    replacements: {searchString}
  })
  return products
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
  const product = Product.create({name,description,price,discounted_price,delivery_cost,image,image_2,thumbnail,display})
  
  return product
}

export async function updateProduct(product_id, name, description, price, discounted_price,delivery_cost,image, image_2, thumbnail, display) {
  
  const entry = await Product.findByPk(product_id)

  const product = await entry.update({name,description,price,discounted_price,delivery_cost,image,image_2,thumbnail,display,});
  
  return product
}