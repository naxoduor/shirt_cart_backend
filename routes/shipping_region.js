const express = require("express");
const router = express.Router();
import {findAllShippingregions,findShppingRegionById,findShppingRegionById,} from "../db/shipping-region";

router.get("/regions/regionid/:shipping_region_id", async (req, res) => {
  let {shipping_region_id} = req.params;
  const shipping = await findShppingRegionById(shipping_region_id);
  res.send(shipping);
});

router.get("/regions", async (req, res) => {
  res.send(await findAllShippingregions());
});

export default router
