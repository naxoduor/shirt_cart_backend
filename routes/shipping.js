import express from 'express'
const router = express.Router()
import db from '../config/database.js'
//const cache = require('../config/cache')
import url from 'url';
import { findShippingRegionById, findAllShippingRegions} from '../db/shipping.js'

router.get('/regions/regionId/:shipping_id', async (req, res) => {
    let inShippingRegionId = req.params.shipping_id
    res.send(await findShippingRegionById(inShippingRegionId))
   

})

router.get('/regions', async (req, res) => {
    res.send(await findAllShippingRegions())
    
});

export default router