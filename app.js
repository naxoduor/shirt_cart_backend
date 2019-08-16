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
    origin: 'http://104.248.73.139',
    credentials: true,
  })
  )
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

  
app.get('/', (req,res) => res.send(`INDEX`));

const PORT = process.env.PORT || 8080;

app.use('/products', require('./routes/products'))

app.use('/categories', require('./routes/categories'))

app.use('/departments', require('./routes/departments'))

app.use('/shoppingcart', require('./routes/shoppingcart'))

app.use('/customers', require('./routes/customer'))

app.use('/orders', require('./routes/orders'))

app.use('/shipping', require('./routes/shipping'))

app.listen(PORT, console.log(`Server started on port ${PORT}`));