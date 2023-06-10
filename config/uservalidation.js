const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const saltRounds = 10;
const secretKey = 'fdsjJLkjKNKkjn.KJN'
const Users = require('../models/users.model');

let hashPassword = async(password)=>{
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

let hashCompare = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}

let createToken = async({email})=>{
    let token = await jwt.sign(
        {email},
        secretKey,
        {expiresIn:'1h'}
        )
    return token;
}

let decodeToken = async(token)=>{
    
    let data = jwt.decode(token)
    console.log('decode', data)
    return data
}


//middleware - verify the token 
let validateToken = async(req,res,next)=>{
    if(req.headers && req.headers.authorization)
    {
        let token = req.headers.authorization.split(" ")[1]
        let data =  await decodeToken(token)
        const verify = await jwt.verify(token, secretKey);
        //const user = await db.collection('users').findOne({_id: ObjectId(verify._id), "tokens": token});
        const users = await Users.find({email:verify.email, token:token})
        console.log("users", users, verify)

        if(!users){
            throw new Error('User does not Exsist')
        }

        let date = Math.round(new Date()/1000)
        if(date<=data.exp)
        {
            next()
        }
        else{
            res.send({
                statusCode:400,
                message:"Token Expired"
            })
        }
    }
    else
    {
        res.send({
            statusCode:400,
            message:"Please Authenticate"
        })
    }
}

module.exports={hashPassword,hashCompare,createToken,decodeToken,validateToken}