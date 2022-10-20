const express = require('express')
const router = express.Router()
const db = require('../config/database')
//const cache = require('../config/cache')
const url = require('url');
const querystring = require('querystring');
const Product = require('../models').product
const Category = require('../models').category
const Sequelize = require('sequelize')
var amqp = require('amqplib/callback_api');

router.get('/', async (req, res) => {
  try {
    const products=await Product.findAll({
      include: [{// Notice `include` takes an ARRAY
        model: Category,
      }],
      // where: { display: 0 },
      // offset: 1,
      // limit: 8
    })
    res.send(products)
  }
  catch(error){
    console.log(error)
    res.send(error)
  }
})

router.get('/inDepartment/:id', async (req, res) => {
  let inDepartmentId = req.params.id
  let key = `/products/inDepartment/${inDepartmentId}`
  try {
  const products= await Product.findAll({
    include: [{
      model: Category,
      where: { department_id: inDepartmentId },
    }],
    where: { display: 0 },
    offset: 1,
    limit: 8
  })
  res.send(products)
  }

  catch(error){
    console.log(error)
    res.send(error)
}
})



router.get('/inCategory/:id', async (req, res) => {
  let inCategorytId = req.params.id
  let key = `/products/inCategory/${inCategorytId}`

  /*cache.get(key, (err, result) => {
    if (result !== null) {
      return res.send(result)
    }
  })*/
try {
  const products = await Product.findAll({
    include: [{
      model: Category,
      where: { category_id: inCategorytId },
    }],
    where: { display: 0 },
    offset: 1,
    limit: 8
  })
}

catch(error){
  console.log(error)
  res.send(error)
}
})

router.post('/inCategory/pagination/:id', async (request, response) => {
  let { category_id, productsPerPage, startItem } = request.body.params
  let key = `/products/inCategory/pagination${category_id}${startItem}`

  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        where: { category_id: category_id },
      }],
      where: { display: 0 },
      offset: startItem,
      limit: productsPerPage
    })
    res.send(products)
  }
  catch(error){
    console.log(error)
    res.send(error)
  }
})

router.post('/inDepartment/pagination/:id', async (request, response) => {
  let { department_id, productsPerPage, startItem } = request.body.params
  let key = `/products/inDepartment/pagination${department_id}${startItem}`

  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        where: { department_id: department_id },
      }],
      where: { display: 0 },
      offset: startItem,
      limit: productsPerPage
    })
    res.send(products)
  }
  catch(error){
    console.log(error)
    res.send(error)
  }
  })

router.post('/search*', async (request, response) => {

  let { inSearchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem } = request.body.params
  let key = `/products/search/${searchString}$`

  try {
    const products = await Product.findAll({
      where: Sequelize.literal('MATCH (name, description) AGAINST (:searchString)'),
      replacements: {
        searchString: inSearchString
      }
    })
    res.send(products)
  }

  catch(error){
    console.log(error)
    res.send(error)
  }
  /*cache.get(key, (err, result) => {
    if (result !== null) {
      return response.send(result)
    }
  })*/

})

router.get('/rabbit', async (req, res) => {

  let inDepartmentId = 1
  try {
    const products = await Product.findAll({
      include: [{// Notice `include` takes an ARRAY
        model: Category,
        where: { department_id: inDepartmentId },
      }],
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

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg)
    })
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
})
}
  catch(error){
    console.log(error)
    res.send(error)
  }
  
})

router.post('/addproduct',async (req,res)=>{

  try {
    let {name, description, price, discounted_price,delivery_cost,image, image2, thumbnail, display} = req.body.params
    const product = await Product.create({
    name:name,
    description:description,
    price:price,
    discounted_price:discounted_price,
    delivery_cost:delivery_cost,
    image:image,
    image2:image2,
    thumbnail:thumbnail,
    display:display
  })
  res.send(product)
  }

  catch(error){
    console.log(error)
    res.send(error)
  }
})

module.exports = router