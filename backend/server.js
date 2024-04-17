require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
//GET all workouts
app.get('/workouts', (req, res) =>{
    res.json({mssg: 'GET all workouts'})
})

//GET single workout
app.get('/workouts/:id', (req, res) =>{
    res.json({mssg: 'GET single workout'})
})

//POST new workout
app.post('/workouts/new', (req, res) => {
    res.json({mssg: "POST new workout"})
})

//DELETE workout
app.delete('/workouts/delete/:id', (req, res) => {
    res.json({mssg: "DELETE a workout"})
})

//UPDATE a workout
app.patch('/workouts/update/:id', (req, res) => {
    res.json({mssg: "UPDATE a workout"})
})

//connect to db
mongoose.connect(process.env.MONGO)
.then(()=>{
    //listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000')
})
})
.catch((error) => {
    console.log(error)
})



