require('dotenv').config()


const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const authCheck = require('./authCheck')
const User = require('./models/userModel')
const Workout = require('./models/workoutModel')
//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//function to create a token (function so can be reused)
const createToken = (id) => { 
    //create a token with the user id and the secret key and set the expiration to 1 day
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '1d'})
}

//login route
app.post('/login', async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await User.login(username, password)

        //create a token using fucntion
        const token = createToken(user._id)

        res.status(200).json({username, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

//register route
app.post('/register', async  (req, res) => {
    const {username, password} = req.body

    try{
        const user = await User.signup(username, password)

        //create a token using fucntion
        const token = createToken(user._id)

        res.status(200).json({username, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }  
})


//mdidleware to check token for all routes
app.use(authCheck)

//routes
//POST new workout
app.post('/workouts/new', async (req, res) => {
    const {title, weight, reps, sets, setTime, restTime} = req.body
    
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title, weight, reps, sets, setTime, restTime, user_id})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

//GET all workouts
app.get('/workouts', async (req, res) =>{
    const workout = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workout)
})

//GET single workout
app.get('/workouts/:id', async (req, res) =>{
    const{id} = req.params
     //Check if a vaild id is used
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No Workout found' });
    }
    const workout = await Workout.findById(id)

    res.status(200).json(workout)
})

//DELETE workout
app.delete('/workouts/delete/:id', async (req, res) => {
    const { id } = req.params;
    //Check if a vaild id is used
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No workout found' });
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    res.status(200).json(workout);
})

//UPDATE a workout
app.patch('/workouts/update/:id', async (req, res) => {
    const { id } = req.params;
    //Check if a vaild id is used
if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No Workout found' });
}

const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

res.status(200).json(workout);
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