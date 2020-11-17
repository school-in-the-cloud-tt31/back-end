const express = require('express');
const router = express.Router()

const Calendar = require('./calendarModel')
const Volunteers = require('../volunteers/volunteersModel')
const checkVolunteer = require('../utils/checkVolunteer')
//=======/api/availability =======

router.get('/user/:id', checkVolunteerId, (req, res) => {
  Calendar.getTimesByUserId(req.params.id)
    .then(timeSlots =>{
      res.status(200).json(timeSlots)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err.message)
    })
})

router.post('/', checkVolunteer, (req, res) => {
  if(req.body.user_id && req.body.day && req.body.time_start && req.body.time_end){
    Calendar.addTimeSlot(req.body)
      .then(timeSlot =>{
        res.status(201).json(timeSlot)
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json(err.message)
      })
  } else {
    res.status(400).json({message: 'Please include the user_id, the day, the start_time and end_time'})
  }
})

router.put('/:id', checkVolunteer, (req, res) => {
  if(req.body.user_id && req.body.day && req.body.time_start && req.body.time_end){
  Calendar.editTimeSlotById(req.params.id, req.body)
    .then(timeSlot =>{
      res.status(200).json(timeSlot)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err.message)
    })
} else {
  res.status(400).json({message: 'Please include the user_id, the day, the time_start and time_end'})
}
})

router.delete('/:id', checkVolunteer, (req, res) => {
  Calendar.deleteTimeSlotById(req.params.id)
    .then( count => {
      res.status(200).json({message: `deleted ${count} record`})
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err.message)
    })
})

//TODO: check if user with id exists mw and role

function checkVolunteerId(req, res, next){
  Volunteers.getVolunteerById(req.params.id)
    .then(volunteer =>{
      if(volunteer && volunteer.role === 'volunteer'){
        next()
      } else {
        res.status(404).json({message: 'A volunteer with that id does not exist'})
      }
    })
}


module.exports = router 