const express = require('express');
var cors = require('cors');
const passport = require('passport')
const Product = require('./models').product
const Category = require('./models').category
const ShoppingCart = require('./models').shopping_cart
const Order = require('./models').order
const OrderDetail = require('./models').order_detail

const db = require('./config/database')
require('./config/passport')
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error ' + err))
const app = express();
app.use(cors({
    origin: 'http://127.0.0.1',
    credentials: true,
  })
  )
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.get('/', (req,res) => res.send(`INDEX`));

const PORT = process.env.PORT || 8080;

app.use('/products', require('./routes/products'))
app.use('/categories', require('./routes/categories'))
app.use('/departments', require('./routes/departments'))
app.use('/attributes', require('./routes/attributes'))
app.use('/chapaa', require('./routes/chapaa'))
app.use('/shoppingcart', require('./routes/shoppingcart'))
app.use('/customers', require('./routes/customer'))
app.use('/orders', require('./routes/orders'))
app.use('/shipping', require('./routes/shipping'))
app.use('/testing', require('./routes/testroute'))
app.use('/chapaa', require('./routes/chapaa'))
app.use('/protected', require('./routes/protected'))
app.listen(PORT, console.log(`Server started on port ${PORT}`));  