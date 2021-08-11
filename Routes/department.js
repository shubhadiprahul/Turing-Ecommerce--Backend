var express = require('express');
const department = express.Router();
const knex = require('../Databases/db')

department.get('/department',(req,res)=>{
    knex.select('*').from('department')
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log('something issue',err)
    })
})

department.get('/department/:id',(req,res)=>{
    knex.select('*').from('department').where('department_id',req.params.id)
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log("something issue",err)

    })
})





module.exports = department;