import { expect } from "chai";
import request from "supertest";
import { it } from "mocha";

import server from "../../server.js";

describe("POST /api/register", () => {
  it("should register new user", async () => {
    const res = await request(server).post("/api/register").send({
      firstName: "Guntur",
      lastName: "Saputro",
      phoneNumber: "0811255501",
      address: "JI. Kebon Sirih No. 1",
      pin: "123456",
    });
    expect(res.body.status).to.equal("success");
  });
});
