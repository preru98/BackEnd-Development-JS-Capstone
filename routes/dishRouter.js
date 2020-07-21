const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Dishes = require('../models/dishes')

dishRouter = express.Router()

dishRouter.use(bodyParser.json())

dishRouter.route('/')

// .all((req, res, next)=>{
//     res.statusCode=200
//     res.setHeader('Content-Type', 'text/plain')
//     next()
// })

.get((req, res, next)=>{
    // res.end("Will send all dishes")
    Dishes.find({})
    .then( ( dishes) =>{
        // console.log(dishes)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json')
        res.json(dishes)
    }, (err) => {
        next(err)
    })
    .catch( (err) => {
        next(err)
    })
})

.post((req, res, next)=>{
    // res.end("Will add dish "+ req.body.name + " " + req.body.description)
    Dishes.create(req.body)
    .then( (dish) =>{
        console.log("Dish Created ", dish)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json')
        res.json(dish)
    }, (err) => {
        next(err)
    })
    .catch( (err) => {
        next(err)
    })
})

.put((req, res, next)=>{
    res.statusCode=403
    res.end("PUT OPERATION NOT SUPPORTED :( ")
})

.delete((req, res, next)=>{
    // res.end("All dishes will be deleted")
    Dishes.remove({})
    .then( (resp) => {
        // console.log(resp)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => {
        next(err)
    })
    .catch( (err) => {
        next(err)
    })
})

dishRouter.route('/:dishId')
.get((req, res, next)=>{
    // res.end("Will send dish with Id " + req.params.dishId)
    Dishes.findById(req.params.dishId)
    .then( ( dish) =>{
        // console.log(dish)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json')
        res.json(dish)
    }, (err) => {
        next(err)
    })
    .catch( (err) => {
        next(err)
    })
})

.post((req, res, next)=>{
    res.statusCode=403
    res.end("POST OPERATION NOT SUPPORTED :( ")
})

.put((req, res, next)=>{
    // res.write("Updating the dish "+ req.params.dishId)
    // res.end("Will update the dish as " + req.body.name + " " + req.body.description)
    Dishes.findByIdAndUpdate(req.params.dishId, 
    { $set : req.body },
    { new :true })
    .then( ( dish) =>{
        // console.log(dish)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json')
        res.json(dish)
    }, (err) => {
        next(err)
    })
    .catch( (err) => {
        next(err)
    })
})

.delete((req, res, next)=>{
    // res.end("Dish "+ req.params.dishId + "will be deleted")
    Dishes.findByIdAndRemove(req.params.dishId)
    .then( ( dish) =>{
        // console.log(dish)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json')
        res.json(dish)
    }, (err) => {
        next(err)
    })
    .catch( (err) => {
        next(err)
    })
})


module.exports = dishRouter;