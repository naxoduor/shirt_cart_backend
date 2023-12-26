import express from 'express'
const router = express.Router()
import { findDepartments, totalItems, products} from '../controllers/departments-controller.js'

router.get('/', findDepartments)

router.get('/totalitems/:department_id', totalItems)

router.post('/products/:department_id', products)


export default router