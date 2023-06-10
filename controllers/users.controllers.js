const Users = require('../models/users.model');
const {hashPassword, hashCompare, createToken} = require('../config/uservalidation');

exports.validateuser = async (req,res) => {
    try {
        res.send({
            statusCode:200,
            message:"Valid Token"
          })
    } catch (err) {
        console.log(err.message)
    }
}

exports.usersignup = async (req,res) => {
    try {
        let users = await Users.find({email:req.body.email})
        if(users.length>0)
  
        {
          res.send({
            statusCode:400,
            message:"User Already Exists"
          })
        }
        else
        {
          let hashedPassword = await hashPassword(req.body.password)
          req.body.password = hashedPassword
          let token = await createToken({email:req.body.email})
          let user = await Users.create({token: token, ...req.body})
          
          res.send({
            statusCode:200,
            message:"User Creation Successfull!",
            user
          })
        }
  
      } catch (error) {
        console.log(error)
        res.send({
          statusCode:500,
          message:"Internal Server Error",
          error
        })
      }
}

exports.userlogin = async (req, res) => {
    try {
        let user = await Users.findOne({email:req.body.email})
        if(user)
        {
           let validatePwd = await hashCompare(req.body.password,user.password)
           if(validatePwd){
              let token = await createToken({email:user.email})
              res.send({
                statusCode:200,
                message:"Login Successfull",
                token,
                userId:user._id
              })
            }
           else
           {
            res.send({
              statusCode:401,
              message:"Incorrect Password"
            })
           }
    
        }
        else
        {
          res.send({
            statusCode:400,
            message:"User Does Not Exists"
          })
        }
    
      } catch (error) {
        console.log(error)
        res.send({
          statusCode:500,
          message:"Internal Server Error",
          error
        })
      }
}