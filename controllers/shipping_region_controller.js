const express = require("express");
const router = express.Router();
import {findAllShippingregions,findShppingRegionById,findShppingRegionById,} from "../db/shipping-region";

export const findShippingRegionById = async (req, res) => {
  let {shipping_region_id} = req.params;
  const shipping = await findShppingRegionById(shipping_region_id);
  res.send(shipping);
}

export const findShippingRegions = async (req, res) => {
  res.send(await findAllShippingregions());
}

export default router
