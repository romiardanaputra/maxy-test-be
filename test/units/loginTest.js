import request from "supertest";
import mongoose from "mongoose";
import app from "../../server.js";
import User from "../../models/UserModel.js";

describe("POST /api/auth/login", () => {
  beforeAll(async () => {
    // Connect to the in-memory database
    const url = `mongodb://127.0.0.1/test_database`;
    await mongoose.connect(url);
  });

  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  it("should return 200 and a token for valid credentials", async () => {
    // Create a test user
    const testUser = new User({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      pin: "1234",
    });
    await testUser.save();

    const res = await request(app).post("/api/auth/login").send({
      phoneNumber: "1234567890",
      pin: "1234",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return 401 for invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      phoneNumber: "1234567890",
      pin: "wrongpin",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("message", "Invalid phone number or pin");
  });

  it("should return 400 for missing credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      phoneNumber: "",
      pin: "",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty(
      "message",
      "Phone number and pin are required"
    );
  });
});
