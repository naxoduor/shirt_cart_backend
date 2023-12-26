import { findShippingRegionById, findAllShippingRegions} from '../db/shipping.js'

export const findShippingById = async (req, res) => {
    let {shipping_id} = req.params
    res.send(await findShippingRegionById(shipping_id))
}

export const findShippingRegions = async (req, res) => {
    res.send(await findAllShippingRegions())
    
}

