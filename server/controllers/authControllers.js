const User = require('../models/user')

const test = (req, res) => {
    res.json('test is working')
}

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

    const user = await User.create({
        name,
        email,
        password,
        imgFile
    })

    return res.status(201).json(user)

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    test,
    registerUser
}