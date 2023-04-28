import {Shipping, ShippingRegion} from '../models/index.js'
export async function findShppingRegionById(inShippingRegionId) {
    const shipping = await Shipping.findOne({
        where: {
            shipping_region_id: inShippingRegionId
        }
    })
    return shipping
}

export async function findAllShippingregions() {
    const shipping_regions = await ShippingRegion.findAll().then((shippingRegions) => {
        res.send(shippingRegions)
    })
    return shipping_regions
}