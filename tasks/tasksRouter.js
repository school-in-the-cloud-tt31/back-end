const express = require('express')
const router = express.Router()

const Tasks = require('./tasksModel')

//======== /api/tasks =====

router.post('/', (req, res) => {

  if(req.body.volunteer_id && req.body.description){
    Tasks.addTask(req.body)
      .then( task =>{
        res.status(201).json(task)
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json(err.message)
      })
  } else {
    res.status(400).json({error: 'Please include a volunteer_id and a description'})
  }
})


router.get('/volunteer/:voluteerId', (req, res) => {
  Tasks.getTasksByVolunteerId(req.params.voluteerId)
    .then(tasks =>{
      res.status(200).json(tasks)
    })
    .catch( err =>{
      console.log(err);
      res.status(500).json(err.message)
    })
})

router.put('/:id', (req, res) => {
  Tasks.editTaskById(req.params.id, req.body)
    .then( task => {
      res.status(200).json(task)
    })
})

router.delete('/:id', (req, res) => {
  Tasks.deleteTaskById(req.params.id)
    .then( count =>{
      res.status(200).json({message: `successfully deleted ${count} record`})
    })
})

router.get('/', (req, res) => {
  
})

module.exports = router