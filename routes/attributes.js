import express from 'express'
const router = express.Router()
//const cache = require('../config/cache')
import { findAttributeById } from '../db/attributes.js'

router.get('/', (req, res) => {
  res.send("found the attributes route")
})

router.get('/inAttribute/:id', async (req, res) => {
  let inProductId = req.params.id
  res.send( await findAttributeById(inProductId))
})

export default router
