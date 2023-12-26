import express, { request } from 'express'
const router = express.Router()
//const cache = require('../config/cache')
import { findAttrById } from '../controllers/attributes-controller.js'

router.get('/', (req, res) => {
  res.send("found the attributes route")
})

router.get('/inAttribute/:product_id', findAttrById)

export default router
