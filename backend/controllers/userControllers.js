const asyncHandler = require('express-async-handler')
// const res = require('express/lib/response')

const User = require('../models/userModel') //querying the database
const generateToken = require('../config/generateToken')

//**************** */ Registering!!!       *************************?///////////////


const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password, pic} = req.body

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all fields")
  }

  //if user exists in our database
  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error('User Already exists')
  }


  // putting this data in the database
  const user = await User.create({
    name,
    email,
    password,
    pic
  })

  // extracting this data and send JWT back
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id)
    }); 

  // if fails, throw error
  } else {
    res.status(400);
    throw new Error('Failed to Create the us');
  }
})


// ****************** LOGIN *****************************************//
const authUser = asyncHandler(async(req, res)=> {
  const {email, password} = req.body

  // query database for email
  const user = await User.findOne({email})

  // extracting this data and send JWT back
  if (user && (await user.matchPassword(password))) {  // function to encypt our password
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id)
    })
  }  else {
    res.status(400);
    throw new Error('Failed to Create the us');
  }
})

module.exports= {registerUser, authUser}