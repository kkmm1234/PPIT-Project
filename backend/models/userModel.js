const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

const User = mongoose.model('User', userSchema);
module.exports = User;