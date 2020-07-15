const express = require('express')
const bodyParser = require('body-parser')

promoRouter = express.Router()

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.all((req, res, next)=>{
    res.statusCode=200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req, res, next)=>{
    res.end("Will send all promotions")
})
.post((req, res, next)=>{
    res.end("Will add promotion "+ req.body.name + " " + req.body.description)
})
.put((req, res, next)=>{
    res.statusCode=403
    res.end("PUT operation not supported")
})
.delete((req, res, next)=>{
    res.end("All promotions will be deleted")
})

promoRouter.route('/:promotionId')
.get((req, res, next)=>{
    res.end("Will send promotion with Id " + req.params.promotionId)
})
.post((req, res, next)=>{
    res.statusCode=403
    res.end("POST operation not supported")
})
.put((req, res, next)=>{
    res.write("Updating the promotion "+ req.params.promotionId)
    res.end("Will update the promotion as " + req.body.name + " " + req.body.description)
})
.delete((req, res, next)=>{
    res.end("Promotion "+ req.params.promotionId + "will be deleted")
})

module.exports = promoRouter;