require('dotenv').config()


const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//mongoose schemas
const Schema = mongoose.Schema
//workout schema
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
//user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//function to create a token (function so can be reused)
const createToken = (id) => { 
    //create a token with the user id and the secret key and set the expiration to 1 day
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '1d'})
}

//static signup method checks if username already exists and password hashing using bcrypt
userSchema.statics.signup = async function (username, password) {
    const exists = await this.findOne({ username });
    //ensure the username is unique
    if (exists) {
        throw Error('Username already exists');
    }

     //ensure the password is provided
     if (!password|| !username) {
        throw new Error('All fields are required');
    }
    //min password length
    if(password.length < 6){
        throw new Error('Password must be at least 6 characters long');
    }

    try {
        //generate a salt
        const passSalt = await bcrypt.genSalt(10);

        //hash the password with the generated salt
        const hashedPass = await bcrypt.hash(password, passSalt);

        //create and return the new user
        const user = await this.create({ username, password: hashedPass });
        return user;
    } catch (error) {
        throw new Error('Failed to hash the password');
    }
}

//static login method checks if the user exists and the password is correct
userSchema.statics.login = async function (username, password) {

    //ensure the password is provided
    if (!password|| !username) {
        throw new Error('All fields are required');
    }
    //find the user by username
    const user = await this.findOne({ username });

    //if the user does not exist
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    //compare the hashed password with the provided password
    const Match = await bcrypt.compare(password, user.password);

    //if the password is incorrect
    if (!Match) {
        throw new Error('Incorrect username or password');
    }

    return user;
}

//model
const workoutModel = mongoose.model('workout', workoutSchema);
const userModel = mongoose.model('User', userSchema);

//routes
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

//GET all workouts
app.get('/workouts', async (req, res) =>{
    const workout = await workoutModel.find({}).sort({createdAt: -1})
    res.status(200).json(workout)
})

//GET single workout
app.get('/workouts/:id', async (req, res) =>{
    const{id} = req.params
     //Check if a vaild id is used
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No Workout found' });
    }
    const workout = await workoutModel.findById(id)

    res.status(200).json(workout)
})

//DELETE workout
app.delete('/workouts/delete/:id', async (req, res) => {
    const { id } = req.params;
    //Check if a vaild id is used
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No workout found' });
    }

    const workout = await workoutModel.findOneAndDelete({ _id: id });

    res.status(200).json(workout);
})

//UPDATE a workout
app.patch('/workouts/update/:id', async (req, res) => {
    const { id } = req.params;
    //Check if a vaild id is used
if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No Workout found' });
}

const workout = await workoutModel.findOneAndUpdate({ _id: id }, { ...req.body });

res.status(200).json(workout);
})

//login route
app.post('/login', async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await userModel.login(username, password)

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
        const user = await userModel.signup(username, password)

        //create a token using fucntion
        const token = createToken(user._id)

        res.status(200).json({username, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }  
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