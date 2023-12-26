import { findShippingRegionById, findAllShippingRegions} from '../db/shipping.js'

router.get('/regions/regionId/:shipping_id', findShippingRegionById)

router.get('/regions', findAllShippingRegions);

export default router