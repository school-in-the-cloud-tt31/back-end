const Calendar = require('./calendarModel')
const db = require('../data/dbConfig')


describe('Calendar Model Tests', ()=>{


  describe('Get time by User Id', ()=>{

    it('should return all available times for that id', async ()=>{
      Calendar.getTimesByUserId(3)
        .then( calendar => {
          expect(calendar).toHaveLength(4)
        })
    })
})
})