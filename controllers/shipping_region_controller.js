const express = require("express");
const router = express.Router();
import {findAllShippingregions,findShppingRegionById,findShppingRegionById,} from "../db/shipping-region";

export const findShippingRegionById = async (req, res) => {
  res.send(await findShppingRegionById(req.params.shipping_region_id));
}

export const findShippingRegions = async (req, res) => {
  res.send(await findAllShippingregions());
}

export default router
