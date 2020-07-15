const express = require('express')
const bodyParser = require('body-parser')

leaderRouter = express.Router()

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all((req, res, next)=>{
    res.statusCode=200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req, res, next)=>{
    res.end("Will send all leaders")
})
.post((req, res, next)=>{
    res.end("Will add leader "+ req.body.name + " " + req.body.description)
})
.put((req, res, next)=>{
    res.statusCode=403
    res.end("PUT operation not supported")
})
.delete((req, res, next)=>{
    res.end("All leaders will be deleted")
})

leaderRouter.route('/:leaderId')
.get((req, res, next)=>{
    res.end("Will send leader with Id " + req.params.leaderId)
})
.post((req, res, next)=>{
    res.statusCode=403
    res.end("POST operation not supported")
})
.put((req, res, next)=>{
    res.write("Updating the leader "+ req.params.leaderId)
    res.end("Will update the leader as " + req.body.name + " " + req.body.description)
})
.delete((req, res, next)=>{
    res.end("Leader "+ req.params.leaderId + "will be deleted")
})

module.exports = leaderRouter;