import express from "express";
const router = express.Router();

import { findShippingRegionById, findAllShippingRegions} from '../db/shipping.js'

router.get('/regions/regionId/:shipping_id', findShippingRegionById)

router.get('/regions', findAllShippingRegions);

export default router




//check position absolute and fixed