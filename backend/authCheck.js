const jwt = require('jsonwebtoken')
const User = require('./models/userModel')
require('dotenv').config()

const authCheck = async (req, res, next) => {
    //verify token
    const {authorization} = req.headers

    //check if token exists
    if (!authorization) {
        return res.status(401).json({error: 'You must be logged in'})
    }

    //split url to get token
    const token = authorization.split(' ')[1]

    try{
        //grab id from token
        const {_id} = jwt.verify(token, process.env.SECRET)
        //find user by id
        req.user = await User.findById(_id ).select('_id')
        next()
    } 
    catch (error) {
        console.log(error)
        return res.status(401).json({error: 'Bad request!!!'})
    }
}

module.exports = authCheck