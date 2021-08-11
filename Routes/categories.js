var express = require('express');
const categories = express.Router();
var knex = require('../Databases/db');

categories.get('/categories',(req,res)=>{
    knex.select('*').from('category')
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log('something issue\n',err)
    })
})


categories.get('/categories/:id',(req,res)=>{
    knex.select('*').from('category').where('category_id',req.params.id)
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log("something issue",err)
    })
})

categories.get('/categories/inProduct/:product_id',(req,res)=>{
    let product_id = req.params.product_id
    knex.select('category.category_id','department_id','name')
    .from('category').join('product_category',function(){
        this.on('category.category_id','product_category.category_id')
    }).where('product_category.category_id',product_id)
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log('something issue\n',err )
    })
})

categories.get('/categories/inDepartment/:department_id',(req,res)=>{
    let department_id = req.params.department_id 
    knex.select('category_id','name','description','department_id')
    .from('category').where('department_id',department_id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something issue' , err)
    })
})

module.exports = categories;