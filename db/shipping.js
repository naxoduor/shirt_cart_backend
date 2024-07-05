import {Shipping} from "../models/index.js"
import {ShippingRegion} from '../models/index.js'

export async function findShippingRegionById(shipping_region_id) {
    return Shipping.findAll({
        where: {shipping_region_id,}
    })
}

export async function findAllShippingRegions() {
    return await ShippingRegion.findAll()
}