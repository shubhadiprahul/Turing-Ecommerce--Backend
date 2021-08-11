const express = require('express');
const knex = require('../Databases/db');
const shipping = express.Router();

shipping.get('/shipping/regions',(req,res)=>{
    knex.select('*')
    .from('shipping')
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log('something issue\n',err)
    })
})

shipping.get('/shipping/regions/:shipping_region_id',(req,res)=>{
    let shipping_region_id = req.params.shipping_region_id
    knex.select('*')
    .from('shipping')
    .where('shipping_region_id',shipping_region_id)
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log('something issue\n',err)
    })
})


module.exports = shipping;
