import {AttributeValue} from '../models/index.js'
import {Product} from '../models/index.js'
import Promise from 'bluebird'

export async function findAttributeById() {
    Promise.all([
        AttributeValue.findAll({
          include: [{
            model: Product,
            where: { product_id: inProductId }
          }],
          where: { attribute_id: 1}
        }),
        AttributeValue.findAll({
          include: [{
            model: Product,
            where: { product_id: inProductId }
          }],
          where: { attribute_id: 2}
        })
      ]).spread((sizeAttributes, colorAttributes)=> {
              return {
                "sizeAttributes": sizeAttributes,
                "colorAttributes": colorAttributes
              }
          })
          .catch(console.error)
}