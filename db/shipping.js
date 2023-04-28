import {Shipping} from "../models/index.js"
import {ShippingRegion} from '../models/index.js'

export async function findShippingRegionById(inShippingRegionId) {
    const shippingInfo = Shipping.findAll({
        where: {
            shipping_region_id: inShippingRegionId
        }
    })
    return shippingInfo
}

export async function findAllShippingRegions() {
    const shipping_regions = await ShippingRegion.findAll()
    return shipping_regions
}