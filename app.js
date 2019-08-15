const express = require('express');
var cors = require('cors');
const Product = require('./models').product
const Category = require('./models').category
const ShoppingCart = require('./models').shopping_cart
const Order = require('./models').order
const OrderDetail = require('./models').order_detail

const db = require('./config/database')
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error ' + err))
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
  )
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

  
app.get('/', (req,res) => res.send(`INDEX`));

const PORT = process.env.PORT || 8080;

Product.count ({
  include: [{
    model: Category,
    where: { category_id: 2 },
  }]
}).then((count)=>{
  let list=[]
  let obj={}
  obj.categories_count=count
  list.push(obj)
  console.log(JSON.stringify(list))
})
/*Order.create({
  created_on: new Date(),
  customer_id:"",
  shipping_id:"",
  tax_id:""
}).then((order) =>{
  let order_id = JSON.parse(JSON.stringify(order)).order_id
ShoppingCart.findAll({
  attributes: ['quantity', 'attributes', 'product_id'],
  include: [{// Notice `include` takes an ARRAY
          model: Product,
          as: "products",
          attributes: ['name', 'price']
        }],
        where: {
          cart_id: "D4rwCMDqrsDsEM12rErBHI5sGEDo4BMJ"
        }
}).then((cart) => {
  let total=0;
  let itemsList=[]
  cart.forEach((item, index) =>{
    let good = JSON.parse(JSON.stringify(item))
    let attributes=good.attributes
    let obj={}
    //console.log(item.getProducts())
    let quantity=good.quantity
    Product.findByPk(good.product_id).then((product) =>{
      let productItem=JSON.parse(JSON.stringify(product))
      let unit_cost=productItem.price
      let subtotal=quantity*unit_cost
      total=total+subtotal
      obj.order_id=order_id
      obj.product_id=productItem.product_id
      obj.attributes=attributes
      obj.product_name=productItem.name
      obj.quantity=quantity
      obj.unit_cost=unit_cost
      itemsList.push(obj)
      if (!cart[index + 1]) {
        console.log(itemsList)
        console.log("we bulk create here")
      }
    })
  })
})
})*/
/*
Category.findAll().then(categories => {
   categories.forEach((category) => {
     console.log(category.getProducts.length)
    category.getProducts().then((products) =>{
     // console.log(products)
      products.forEach((product) =>{
       // console.log(product)
        products1.push(product)
      })
    })
  })  
})
console.log("print product1")
console.log(products1)
*/
//console.log(products1)
//Gig routes
app.use('/products', require('./routes/products'))

app.use('/categories', require('./routes/categories'))

app.use('/departments', require('./routes/departments'))

app.use('/shoppingcart', require('./routes/shoppingcart'))

app.use('/customers', require('./routes/customer'))

app.use('/orders', require('./routes/orders'))

app.use('/shipping', require('./routes/shipping'))

app.listen(PORT, console.log(`Server started on port ${PORT}`));