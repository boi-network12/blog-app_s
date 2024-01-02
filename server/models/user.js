const mongoose = require('mongoose');
const {schema} = mongoose

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    imgFile: {
        data: Buffer,
        contentType: String,
    }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;