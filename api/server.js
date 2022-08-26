const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/mern", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
})

const Todo = require('./models/Todo');
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
})
app.post('/todo/new', async (req, res) => {
    let todo = new Todo({
        text: req.body.text
    })
    todo.save()
    res.send(todo)
})
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result)
})
app.put('/todo/complete/:abc', async (req, res) => {
    const todo = await Todo.findById(req.params.abc);
    todo.complete = !todo.complete;
    todo.save()
    console.log(req.params)
    res.json(todo)
})
app.listen(3001, () => console.log("Server Started on DB 3001"));