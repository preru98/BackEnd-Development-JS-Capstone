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


dishRouter.route('/:dishId/comments')
.get((req, res, next)=>{
    // res.end("Will send all comments")
    Dishes.findById(req.params.dishId)
    .then( ( dish) =>{
        if(dish != null){
            // console.log(dish)
            res.statusCode=200
            res.setHeader('Content-Type', 'application/json')
            res.json(dish.comments)
        }
        else{
            // console.log("Else  part")
            err = new Error("Dish with ID : " +req.params.dishId + " not found :)")
            err.status=404
            return next(err);
        }
    }, (err) => {
        // console.log("Err  part")
        console.log(err)
        next(err)
    })
    .catch( (err) => {
        // console.log("Catch  part")
        next(err)
    })
})

.post((req, res, next)=>{
    // res.end("Will add comment ")
    Dishes.findById(req.params.dishId)
    .then( ( dish) =>{
        if(dish != null){
            dish.comments.push(req.body)
            dish.save()
            .then( (dish) => {
                res.statusCode=200
                res.setHeader('Content-Type', 'application/json')
                res.json(dish)
            }, (err) => {
                next(err)
            })
        }
        else{
            err = new Error("Dish with ID : " +req.params.dishId + " not found :)")
            err.status=404
            return next(err);
        }
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
    Dishes.findById(req.params.dishId)
    .then( ( dish) =>{
        if (dish != null) {
            for (var i = (dish.comments.length -1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else{
            err = new Error("Dish with ID : " +req.params.dishId + " not found :)")
            err.status=404
            return next(err);
        }
    }, (err) => {
        next(err)
    })
    .catch( (err) => {
        next(err)
    })
})


dishRouter.route('/:dishId/comments/:commentId')
.get((req, res, next)=>{
    // res.end("Will send comment with dishId " + req.params.dishId+ " and commentID "+ req.params.commentId)
    Dishes.findById(req.params.dishId)
    .then( ( dish) =>{
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            res.statusCode=200
            res.setHeader('Content-Type', 'application/json')
            res.json(dish.comments.id(req.params.commentId))
        }
        else if(dish == null){
            err = new Error("Dish with ID : " +req.params.dishId + " not found :)")
            err.status=404
            return next(err);
        }
        else {
            err = new Error("Comment with ID : " +req.params.commentId + " not found :)")
            err.status=404
            return next(err);
        }
    }, (err) => {
        // console.log("Err  part")
        console.log(err)
        next(err)
    })
    .catch( (err) => {
        // console.log("Catch  part")
        next(err)
    })
})

.post((req, res, next)=>{
    res.statusCode=403
    res.end("POST OPERATION NOT SUPPORTED :( ")
})

.put((req, res, next)=>{
    // res.write("Updating the comment "+ req.params.dishId)
    // res.end("Will update the comment")
    Dishes.findById(req.params.dishId)
    .then( ( dish) =>{
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating = req.body.rating
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment = req.body.comment
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if(dish == null){
            err = new Error("Dish with ID : " +req.params.dishId + " not found :)")
            err.status=404
            return next(err);
        }
        else {
            err = new Error("Comment with ID : " +req.params.commentId + " not found :)")
            err.status=404
            return next(err);
        }
    }, (err) => {
        // console.log("Err  part")
        console.log(err)
        next(err)
    })
    .catch( (err) => {
        // console.log("Catch  part")
        next(err)
    })
})

.delete((req, res, next)=>{
    // res.end("Dish "+ req.params.dishId + "will be deleted")
    Dishes.findById(req.params.dishId)
    .then( ( dish) =>{
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            dish.comments.id(req.params.commentId).remove()
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if(dish == null){
            err = new Error("Dish with ID : " +req.params.dishId + " not found :)")
            err.status=404
            return next(err);
        }
        else {
            err = new Error("Comment with ID : " +req.params.commentId + " not found :)")
            err.status=404
            return next(err);
        }
    }, (err) => {
        next(err)
    })
    .catch( (err) => {
        next(err)
    })
})


module.exports = dishRouter;