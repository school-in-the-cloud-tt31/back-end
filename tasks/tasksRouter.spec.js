const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("Tasks Tests", () => {
  //empty users table before each test
  beforeEach(async () => {
    await db("users").truncate();
    await db("tasks").truncate();
  });

  describe("GET /api/tasks/volunteer/:voluteerId", () => {
    it("should add task to db", async () => {
      await db("users").truncate();
      const registerUser = {
        email: "testing@email.com",
        password: "test123",
        name: "testing",
        role: 3,
        country: "mexico",
      };

      const user = {
        email: "testing@email.com",
        password: "test123",
      };

      //register a user
      await supertest(server).post("/api/auth/register").send(registerUser);
      //Log user in
      const res = await supertest(server).post("/api/auth/login").send(user);
      const token = res.body.token;
      const volunteer_id = res.body.user.id;

      const task = {
        volunteer_id,
        description: "this should be working",
      };

      //adding task to databse
      await supertest(server)
        .post("/api/tasks")
        .send(task)
        .set("authorization", token);

      const tasks = await db("tasks");
      expect(tasks).toHaveLength(1);
    });
    it("should return tasks by volunteerid", async () => {
      await db("users").truncate();
      const registerUser = {
        email: "testing@email.com",
        password: "test123",
        name: "testing",
        role: 3,
        country: "mexico",
      };

      const user = {
        email: "testing@email.com",
        password: "test123",
      };

      //register a user
      await supertest(server).post("/api/auth/register").send(registerUser);
      //Log user in
      const res = await supertest(server).post("/api/auth/login").send(user);
      const token = res.body.token;
      const volunteer_id = res.body.user.id;

      const task = {
        volunteer_id,
        description: "this should be working",
      };

      //adding task to databse
      await supertest(server)
        .post("/api/tasks")
        .send(task)
        .set("authorization", token);
      //getting tasks by volunteerid
      const userTasks = await supertest(server).get('/api/tasks/volunteer/1').set('authorization', token)
      
      expect(userTasks.body).toHaveLength(1);
    });
    it("should not allow you to see tasks without logging in", async () => {
      
      //getting tasks by volunteerid
      const userTasks = await supertest(server).get('/api/tasks/volunteer/1')
      
      expect(userTasks.body.message).toBe('Please provide credentials');
    });
  });
});