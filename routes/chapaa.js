const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')

router.get('/', (req, res)=>{
    res.status(200).json({
        "ResultCode": 0,
        "ResultDesc": "Success",
        "ThirdPartyTransID": 0
    })
})

router.post('/', (req, res)=>{
    res.status(200).json({
        "ResultCode": 0,
        "ResultDesc": "Success",
        "ThirdPartyTransID": 0
    })
})

router.get('/validate', (req, res)=>{
	console.log("validate the get request")
	res.status(200).json({
	"ResultCode": 0,
	"ResultDesc": "Success",
	"ThirdPartyTransID": 0
})
})

router.post('/validate', (req, res)=>{
	res.status(200).json({
	"ResultCode": 0,
	"ResultDesc": "Success",
	"ThirdPartyDesc": 0
})
})

router.post('/receive', (req, res) => {
    res.status(200).json({
        "C2BPaymentConfirmationResult":"Success"
    })
})

router.get('/receive', (req, res) => {
	res.status(200).json({
	"C2BPaymentConfirmationResult":"Success"
})
})

router.post('/checking', (req, res) => {
    console.log(req.body)
    res.status(200).json({
        "message":"testing the route",
        "message2": "A second message"
    })
  
})


module.exports = router
