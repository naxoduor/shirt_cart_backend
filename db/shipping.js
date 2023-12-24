import {Shipping} from "../models/index.js"
import {ShippingRegion} from '../models/index.js'

export async function findShippingRegionById(shipping_region_id) {
    const shippingInfo = Shipping.findAll({
        where: {shipping_region_id,}
    })
    return shippingInfo
}

export async function findAllShippingRegions() {
    const shipping_regions = await ShippingRegion.findAll()
    return shipping_regions
}