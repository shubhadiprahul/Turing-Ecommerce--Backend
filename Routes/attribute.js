var express = require('express');
const attribute = express.Router();
const knex = require('../Databases/db')

attribute.get('/attribute', (req, res) => {
    knex.select('*').from('attribute')
        .then((data) => {
            console.log(data)
            res.send(data)
        }).catch((err) => {
            console.log("something issue", err)
            res.send("something issue")
        })

})

attribute.get('/attribute/:id', (req, res) => {
    knex.select('*').from('attribute').where('attribute_id', req.params.id)
        .then((data) => {
            console.log(data)
            res.send(data)
        }).catch((err) => {
            console.log("something issue", err)
            res.send("something issue")
        })
})

attribute.get('/attribute/value/:attribute_value_id', (req, res) => {
    let attribute_value_id = req.params.attribute_value_id
    knex.select('attribute_value_id', 'value')
    .from('attribute_value')
    .where('attribute_value_id', attribute_value_id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something issue',err)
        res.send("something issue")
    })
})


module.exports = attribute;