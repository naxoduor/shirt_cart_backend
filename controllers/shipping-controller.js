import { findShippingRegionById, findAllShippingRegions} from '../db/shipping.js'

export const findShippingById = async (req, res) => {
    res.send(await findShippingRegionById(req.params.shipping_id))
}

export const findShippingRegions = async (req, res) => {
    res.send(await findAllShippingRegions())
    
}

