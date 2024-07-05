import { findAttributeById } from '../db/attributes.js'

export const findAttrById = async (req, res) => {
    res.send( await findAttributeById(req.params.product_id))
}