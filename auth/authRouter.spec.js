const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("Auth Tests", () => {
  //empty users table before each test
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /register", () => {
    it("should register a user to a database", async () => {
      const user = {
        email: "testing@email.com",
        password: "test123",
        name: "testing",
        role: 3,
        country: "mexico",
      };

      await supertest(server).post("/api/auth/register").send(user);
      const users = await db("users");
      expect(users).toHaveLength(1);
    });
    it("should check the role of the new user", async () => {
      const user = {
        email: "testing@email.com",
        password: "test123",
        name: "testing",
        role: 3,
        country: "mexico",
      };

      const res = await supertest(server).post("/api/auth/register").send(user);
      expect(res.body.user.role).toBe("student");
    });
  });
  describe("/login", () => {
    it("should return a token if password is correct", async () => {
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
      
      // Check if token exists
      expect(res.body.token).toBeDefined();
    });

    it("should return 401 if credentials are wrong", async () => {
      
      const registerUser = {
        email: "testing@email.com",
        password: "test123",
        name: "testing",
        role: 3,
        country: "mexico",
      };
      

      //register a user
      await supertest(server).post("/api/auth/register").send(registerUser);

      //Log user in with wrong credentials

      const wrongPassword = {
        email: "testing@email.com",
        password: "test12",
      };
      let res = await supertest(server)
        .post("/api/auth/login")
        .send(wrongPassword);

      expect(res.status).toBe(401);
    });
  });
});