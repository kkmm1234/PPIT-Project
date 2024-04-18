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

//mongoose schema
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    sets:{
        type: Number,
        required: true
    },
    setTime: {
        type: Number,
        required: true
    },
    restTime: {
        type: Number,
        required: true
    }
})
//model
const workoutModel = mongoose.model('workout', workoutSchema);

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
app.post('/workouts/new', async (req, res) => {
    const {title, weight, reps, sets, setTime, restTime} = req.body
    try{
        const workout = await workoutModel.create({title, weight, reps, sets, setTime, restTime})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
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



