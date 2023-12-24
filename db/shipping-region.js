import {Shipping, ShippingRegion} from '../models/index.js'
export async function findShppingRegionById(shipping_region_id) {
    const shipping = await Shipping.findOne({
        where: {shipping_region_id}
    })
    return shipping
}

export async function findAllShippingregions() {
    const shipping_regions = await ShippingRegion.findAll()
    return shipping_regions
}