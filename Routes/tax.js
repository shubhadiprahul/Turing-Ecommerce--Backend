const express = require('express');
const knex = require('../Databases/db');
const tax = express.Router();

tax.get('/tax',(req,res)=>{
    knex
    .select('*')
    .from('tax')
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log('something issue\n',err)
    })
})


tax.get('/tax/:tax_id',(req,res)=>{
    let tax_id = req.params.tax_id
    knex.select('*')
    .from('tax')
    .where('tax_id',tax_id)
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log('something issue\n',err)
    })
})




module.exports = tax;