const express = require("express");
const router = express.Router();
import {
  findAllShippingregions,
  findShppingRegionById,
  findShppingRegionById,
} from "../db/shipping-region";

router.get("/regions/regionid/:shipping_region_id", async (req, res) => {
  let inShippingRegionId = req.params.shipping_region_id;
  const shipping = await findShppingRegionById(inShippingRegionId);
  res.send(shipping);
});

router.get("/regions", async (req, res) => {
  res.send(await findAllShippingregions());
});

export default router
