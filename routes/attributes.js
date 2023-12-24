import express, { request } from 'express'
const router = express.Router()
//const cache = require('../config/cache')
import { findAttributeById } from '../db/attributes.js'

router.get('/', (req, res) => {
  res.send("found the attributes route")
})

router.get('/inAttribute/:product_id', async (req, res) => {
  const {product_id} = req.params
  res.send( await findAttributeById(product_id))
})

export default router
