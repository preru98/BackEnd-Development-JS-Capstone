const express = require('express')
const bodyParser = require('body-parser')

dishRouter = express.Router()

dishRouter.use(bodyParser.json())

dishRouter.route('/')
.all((req, res, next)=>{
    res.statusCode=200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req, res, next)=>{
    res.end("Will send all dishes")
})
.post((req, res, next)=>{
    res.end("Will add dish "+ req.body.name + " " + req.body.description)
})
.put((req, res, next)=>{
    res.statusCode=403
    res.end("PUT operation not supported")
})
.delete((req, res, next)=>{
    res.end("All dishes will be deleted")
})

dishRouter.route('/:dishId')
.get((req, res, next)=>{
    res.end("Will send dish with Id " + req.params.dishId)
})
.post((req, res, next)=>{
    res.statusCode=403
    res.end("POST operation not supported")
})
.put((req, res, next)=>{
    res.write("Updating the dish "+ req.params.dishId)
    res.end("Will update the dish as " + req.body.name + " " + req.body.description)
})
.delete((req, res, next)=>{
    res.end("Dish "+ req.params.dishId + "will be deleted")
})

module.exports = dishRouter;