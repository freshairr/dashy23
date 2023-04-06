const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo')
const { ensureAuth } = require('../middleware/passportAuth')

router.get('/', (req, res, next) => {
    if(req.isAuthenticated()) next('route') //next router if authenticated
    else next() //directly following if not authenticated
}, (req, res, next) => {
    console.log("guest route")
    loginStatus = req.isAuthenticated()
    todoController.getTodo(req, res, loginStatus)
}) 

router.get('/', (req, res, next) => {
    console.log("authenticated route: ", req.user.id, req.user.displayName)
    loginStatus = req.isAuthenticated()
    todoController.getTodo(req, res, loginStatus)
})

router.post('/createtodo', todoController.createTodo)
router.put('/markcomplete', todoController.markComplete)
router.put('/markUncomplete', todoController.markUncomplete)
router.delete('/delete', todoController.deleteTodo)

module.exports = router