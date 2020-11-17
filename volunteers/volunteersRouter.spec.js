
const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");
const {getVolunteers} = require('../volunteers/volunteersModel')

describe("Volunteers Tests", () => {
  //empty users table before each test
  beforeEach(async () => {
    await db("users").truncate();
    
  });

  describe("GET /api/volunteers", () => {
    it("should not allow you to see tasks without logging in", async () => {
      //getting volunteers
      const volunteers = await supertest(server).get('/api/volunteers')
  
      expect(volunteers.body.message).toBe('Please provide credentials');
    });

    it.skip('should return all volunteers', async ()=>{
      // //sign up a volunteer 
        const registerUser = {
          email: "testing@email.com",
          password: "test123",
          name: "testing",
          role: 3,  //volunteer
          country: "mexico",
        };

        const registerUser2 = {
          email: "testing2@email.com",
          password: "test123",
          name: "testing2",
          role: 3,  //volunteer
          country: "usa",
        };
  
        await supertest(server).post("/api/auth/register").send(registerUser);
        await supertest(server).post("/api/auth/register").send(registerUser2);

        const res = await supertest(server).post("/api/auth/login").send(user);
        const token = res.body.token;

        const volunteers = await supertest(server).get('/api/volunteers').set('authorization', token)


        console.log(volunteers.body);

    })    
  });
});