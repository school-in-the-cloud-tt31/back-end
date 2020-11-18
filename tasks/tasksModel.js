const db = require('../data/dbConfig')

module.exports = {
  addTask,
  getTasksByVolunteerId,
  editTaskById,
  deleteTaskById
}

function addTask(task){
  return db('tasks').insert(task, 'id')
    .then( id =>{
      return getTaskById(id[0])
    })
}

function getTaskById(id){
  return db('tasks').select('*').where({id}).first()
}

function getTasksByVolunteerId(volunteerId){
  return db('tasks').select('*').where('volunteer_id', volunteerId)
}

function editTaskById(id, updatedTask){
  return db('tasks').where({id}).update(updatedTask)
    .then(()=>{
      return getTaskById(id)
    })
}

function deleteTaskById(id){
  return db('tasks').where({id}).del()
    .then(count =>{
      return count
    })
}