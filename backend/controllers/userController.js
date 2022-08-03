const User = require("../models/User")
const bcrypt = require("bcrypt")


const registerUser =  async (req,res,next) => {

    try {
        const {username, email, password} = req.body

        const usernameExists = await User.findOne({username})
        if(usernameExists){
            return res.json({msg: "Username already exists",status: false})
        }

        const emailExists = await User.findOne({email})
        if(emailExists){
            return res.json({msg: "A user with the email entered already exists", status: false})
        }

        const hash = await bcrypt.hash(password,10)
        
        const user = await User.create({
            email,
            username,
            password: hash
        })

        delete user.password;
        return res.json({user,status: true})
    } catch (ex) {
        next(ex)
    }

}

const loginUser = async (req,res,next) => {
    try{
        const { username, password } = req.body;
        
        const user = await User.findOne({username})
        if(!user){
            return res.json({msg: "Incorrect login details. Please check the username and password you entered", status:false})
        }

        const passwordMatch = await bcrypt.compare(password,user.password)
        
        if(!passwordMatch){
            return res.json({msg: "Incorrect login details. Please check the username and password you entered", status: false})
        }

        delete user.password;
        return res.json({user, status:true})

    } catch (ex) {
        next(ex)
    }
}

// fetch all users except the user corresponding to the id passed in request
const getAllUsers = async (req,res,next) => {
    try {
        const allUsers =  await User.find({_id: { $ne : req.params.id} }).select([
            "_id","username","email"
        ])
        return res.status(200).json(allUsers)
    } catch(ex) {
        next(ex)
    }
}

module.exports = {registerUser,loginUser,getAllUsers}