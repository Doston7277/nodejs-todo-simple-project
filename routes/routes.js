const router = require('express').Router()
const { model } = require('mongoose')
const Todo = require('../models/todo')

router.get('/', function(req, res){
    Todo.find({}).then(function(result){
        let todos = result.filter(function(todo){
            return !todo.done
        })

        let doneTodos = result.filter(function(todo){
            return todo.done
        })

        res.render('index', { todos: todos, doneTodos: doneTodos })
    })
})

router.post('/todos', function(req, res){
    let newTodo = new Todo({ description: req.body.description })

    newTodo.save()
        .then(function(res){
            console.log(res)
            res.redirect('/')
        }).catch(function(err){
            console.log(err)
            res.redirect('/')
        })
})

router.post('/todos/:id/completed', function(req, res){
    let todoId = req.params.id

    Todo.findById(todoId)
    .exec()
    .then(function(res){
        res.done = !res.done
        return res.save()
    }).then(function(result){
        res.redirect('/')
    })
})

module.exports = router