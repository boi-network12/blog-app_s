const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken');


const test = (req, res) => {
    res.json('test is working')
}
//  register end point
// 
const registerUser = async (req, res) => {
    try{
       const {name, email, password, imgFile} = req.body;
       //check if name was entered
       if(!name){
        return res.json({
            error: 'name is required'
        })
       };
       //check is password is good
       //
       
       if(!password || password.length < 8){
           return res.json({
            error: 'password is required and should be at least 8, number and character'
           })
       };

       // check if imgFile is present
       
       if (!imgFile) {
        return res.json({
            error: "Profile picture is required"
        })
        
       }

    // check email
    
    const exist = await User.findOne({email});
    if(exist){
        return res.json({
            error: 'Email is already taken'
        })
    }
    
    const hashedPassword = await hashPassword(password)

    // create user in data base
    

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        imgFile
    })

    return res.status(201).json(user)

    } catch (error) {
        console.log(error);
    }
}

// login endpoint

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        // check if user exist 
        // 
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: "no user found"
            })
        }

        // check if the password match
        
        const match = await comparePassword(password, user.password);
        if(match){
            // create and set token
            jwt.sign({email: user.email, id: user._id,name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match){
            res.json({
                error: "password is incorrect"
            })
        }

    } catch(error){
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token){
       jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if(err) throw err;
        res.json(user)
       })
    } else{
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}