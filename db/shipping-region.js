import {Shipping, ShippingRegion} from '../models/index.js'
export async function findShppingRegionById(shipping_region_id) {
    return await Shipping.findOne({
        where: {shipping_region_id}
    })
}

export async function findAllShippingregions() {
    return await ShippingRegion.findAll()
}