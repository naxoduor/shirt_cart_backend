const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')

router.post('/receive', (req, res) => {
    console.log(req.body)
    res.json({
        "message":"money received"
    })
  
})

router.post('/checking', (req, res) => {
    console.log(req.body)
    res.json({
        "message":"testing the route",
        "message2": "A second message"
    })
  
})


module.exports = router