const db = require('../data/dbConfig')

module.exports = {
  getVolunteers,
  getVolunteerById
}

function getVolunteers(){
  return db('users')
    .select('users.id', 'users.email', 'users.name','roles.role', 'user_country.country')
    .join('user_roles', 'user_roles.user_id', 'users.id')
    .join('roles', 'user_roles.role_id', 'roles.id')
    .leftJoin('user_country', 'user_country.user_id','users.id' )
    .where('user_roles.role_id', 3)
      .then( async (volunteers) =>{
        let newArray = []
        for(i of volunteers ){
          await getAvailability(i.id)
            .then(times =>{
              newArray.push({
                ...i,
                availability: times
              })
            })
        }
          return newArray
      })
}

function getVolunteerById(id){
  return db('users')
    .select('users.id', 'users.email', 'users.name','roles.role', 'user_country.country')
    .join('user_roles', 'user_roles.user_id', 'users.id')
    .join('roles', 'user_roles.role_id', 'roles.id')
    .leftJoin('user_country', 'user_country.user_id','users.id' )
    .where('users.id', id).first()
}

function getAvailability(id){
  return db('availability')
    .select('id','day', 'time_start', 'time_end')
    .where('user_id', id)
}