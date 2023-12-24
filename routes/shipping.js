import express from 'express'
const router = express.Router()
import db from '../config/database.js'
//const cache = require('../config/cache')
import url from 'url';
import { findShippingRegionById, findAllShippingRegions} from '../db/shipping.js'

router.get('/regions/regionId/:shipping_id', async (req, res) => {
    let {shipping_id} = req.params
    res.send(await findShippingRegionById(shipping_id))
})

router.get('/regions', async (req, res) => {
    res.send(await findAllShippingRegions())
    
});

export default router