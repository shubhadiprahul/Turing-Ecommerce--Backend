var express = require('express');
const customer = express.Router();
const knex = require('../Databases/db')
const {generateAccessToken,authenticateToken} = require('../auth/jwt')


customer.post('/customer/register',(req,res)=>{
    knex.select('*')
    .from('customer')
    .where({'email':req.body.email,'password':req.body.password})
    .then((data)=>{
        if (data.length < 1){
            knex('customer').insert(req.body)
            .then((result)=>{
                console.log({'sucess':'User Registered'})
                res.send(({'sucess':'User Registered'}))
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            console.log({'message':'User already exist'})
            res.send({'message':'User already exist'})
        }
    }).catch((err)=>{
        console.log(err)
    })
})

customer.get('/customer/:customer_id',authenticateToken,(req,res)=>{
    knex.select('*')
    .from('customer')
    .where('customer_id',req.params.customer_id)
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})

customer.post('/customer/login',(req,res)=>{
    knex.select('*').from('customer')
    .where({'email':req.body.email,'password':req.body.password})
    .then((data)=>{
        const token = generateAccessToken({"email":data[0].email ,"customer_id":data[0].customer_id})
        console.log(token)
        console.log('successfull login')
        res.cookie(token)
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })

})

customer.put('/customer/update/:customer_id',authenticateToken,(req,res)=>{
    knex('customer')
    .where('customer_id',req.params.customer_id)
    .update(req.body)
    .then((data)=>{
        console.log({'sucess':'user update'})
        res.send({'sucess':'user update'})
    }).catch((err)=>{
        console.log(err)
    })
})


customer.put('/customer/address',authenticateToken,(req,res)=>{
    var customer_id = req.body.customer_id;
    console.log(customer_id)
    knex('customer').where('customer_id',customer_id)
    .update({
        'address_1':req.body.address_1,
        'address_2':req.body.address_2,
        'city':req.body.city,
        'region':req.body.region,
        'postal_code':req.body.postal_code,
        'country':req.body.country,
        'shipping_region_id':req.body.shipping_region_id
    }).then((data)=>{
        console.log({'sucess':'user sucessfully update'})
        res.send({'sucess':'user sucessfully update'})
    }).catch((err)=>{
        console.log(err)
    })
})


customer.put('/customers/creditCard', authenticateToken, (req, res) => {
    console.log(req.body)
    knex('customer')
        .update({
            'credit_card': req.body.credit_card
        })
        .where('customer_id', req.body.customer_id)
        .then((data) => {
            console.log({ 'User_data': data })
            res.send({ "Done": "data updated successfully!" })
        }).catch((err) => {
            console.log({ err: err.message })
            res.send({ err: err.message })
        })
});


module.exports = customer;