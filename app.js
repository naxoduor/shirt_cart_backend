import  _  from 'lodash';
import express from 'express';
import cors from 'cors';
// import passport from 'passport'

import db from './config/database.js'
import './config/passport.js'
db.authenticate()
.then(() => console.log('Database connected Sucessfully........................'))
.catch(err => console.log('Error Connecting to database......................................' + err))
const app = express();
import products from './routes/products.js'
import categories from './routes/categories.js';
import departments from './models/department.js';
import attributes from './routes/attributes.js';
import chapaa from './routes/chapaa.js';
import shoppingcart from './routes/shoppingcart.js';
import customers from './routes/customer.js';
import orders from './routes/orders.js';
import orderdetails from './routes/orderdetails.js';
import shipping from './routes/shipping.js';
import testing from './routes/testroute.js';
import protect from './routes/protected.js';
import { swaggerUi, swaggerDocument } from "./config/swagger.js";



// app.use(function(req, res, next) {
//   var allowedOrigins = ['http://localhost:3000/', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', 'https://sandbox.safaricom.co.ke'];
//   var origin = req.headers.origin;
//   if(allowedOrigins.indexOf(origin) > -1){
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// })

// app.use(cors({
//     origin: 'http://localhost:3000/',
//     credentials: true,
//   })
//   )
  
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use(passport.initialize());
app.get('/', (req,res) => res.send(`INDEX`));

const PORT = process.env.PORT || 8082;

app.use('/products', products)
app.use('/categories', categories)
app.use('/departments', departments)
app.use('/attributes', attributes)
app.use('/chapaa', chapaa)
app.use('/shoppingcart', shoppingcart)
app.use('/customers', customers)
app.use('/orders', orders)
app.use('/orderdetails', orderdetails)
app.use('/shipping', shipping)
app.use('/testing', testing)
app.use('/chapaa', chapaa)
app.use('/protected', protect)
app.listen(PORT, "0.0.0.0");  
