const db = require('../data/dbConfig')

module.exports = {
  getTimesByUserId,
  addTimeSlot,
  getTimeSlotById,
  editTimeSlotById,
  deleteTimeSlotById

}

function getTimesByUserId(id){
  return db('availability')
    .select('id', 'day', 'time_start', 'time_end')
    .where({user_id: id})
}

function addTimeSlot(timeSlot){
  return db('availability').insert(timeSlot, 'id')
    .then(id =>{
      return getTimeSlotById(id[0])
    })
}

function getTimeSlotById(id){
  return db('availability').select('*').where({id}).first()
}

function editTimeSlotById(id, updatedTime){
  return db('availability').where({id}).update(updatedTime)
    .then(()=>{
      return getTimeSlotById(id)
    })
}

function deleteTimeSlotById(id){
  return db('availability').where({id}).del()
    .then(count =>{
      return count
    })
}