const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }, 
    user_id: {
        type: String,
        required: true
    }
})

const workoutModel = mongoose.model('workout', workoutSchema);
module.exports = workoutModel;