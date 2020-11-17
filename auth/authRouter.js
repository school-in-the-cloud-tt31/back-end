const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Users = require('./authModel')
const generateToken = require('./generateToken')

// ======= api/auth ======


router.post('/register', validateUser, (req, res) =>{
    const hash = bcrypt.hashSync(req.body.password, 8);
    const newUser = {
      ...req.body,
      password: hash
    }
  
    Users.addUser(newUser)
      .then(user =>{
        const token = generateToken(user)
        res.status(201).json({user, token})
      })
      .catch(err =>{
        console.log(err);
        if(err.message.includes('UNIQUE constraint failed: users.email') || err.message.includes('users_email_unique')){
          res.status(500).json({error: 'this email is already taken'})
        } else {
          res.status(500).json(err.message)
        }
      })
})

router.post('/login', (req, res) => {

  Users.getUserByEmail(req.body.email)
    .then(user =>{
      if(user && bcrypt.compareSync(req.body.password, user.password)){
        const token = generateToken(user)
        res.status(200).json({user, token})
      } else {
        res.status(401).json({error: 'Invalid User Credentials'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err.message)
    })
})

function validateUser(req, res, next){
  if(!req.body.email || !req.body.password || !req.body.name || !req.body.role){
    res.status(400).json({message: 'please include email, password, name, and role'})
  } else if(req.body.role === 3 && !req.body.country){
    res.status(400).json({message: 'Please add a country for the'})
  }else if(req.body.role > 3 || (typeof req.body.role === 'string')) {
    res.status(400).json({message: `${req.body.role} is not a valid role. Only accepts 1 for student, 2 for admin, 3 for volunteer`})
  }else{
    next()
  }
}

module.exports = router