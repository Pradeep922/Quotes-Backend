const mongoose = require('mongoose');
const validator = require('validator')


const userSchema = new mongoose.Schema({
    firstName:{type:'string', required:true},
    lastName:{type:'string', required:true},
    email:{
        type: 'string',
        required: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password:{type:'string', required:true},
    token: {type: 'string', required:true},
    createdAt:{type:Date, default:Date.now()}
})

module.exports = mongoose.model('Users', userSchema);