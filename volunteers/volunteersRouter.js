const express = require('express')
const router = express.Router()

const Volunteers = require('./volunteersModel')
const { json } = require('express')


// ======= api/volunteers ======

router.get('/', (req, res) =>{
  Volunteers.getVolunteers()
    .then( volunteers =>{
      res.status(200).json(volunteers)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err.message)
    })
})



module.exports = router