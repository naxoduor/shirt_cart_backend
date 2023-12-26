import { findAttributeById } from '../db/attributes.js'

export const findAttrById = async (req, res) => {
    const {product_id} = req.params
    res.send( await findAttributeById(product_id))
}