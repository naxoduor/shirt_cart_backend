const express = require("express");
const router = express.Router();
import {findShippingRegionById, findShippingRegions} from "../controllers/shipping_region_controller.js";

router.get("/regions/regionid/:shipping_region_id", findShippingRegionById);

router.get("/regions", findShippingRegions);

export default router
