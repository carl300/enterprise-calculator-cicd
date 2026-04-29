const request = require("supertest");
const app = require("../src/app");

describe("Calculator API Tests", () => {

  test("GET /health should return healthy", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("healthy");
  });

  test("GET /add should add two numbers", async () => {
    const res = await request(app).get("/add?a=10&b=5");

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(15);
  });

  test("GET /subtract should subtract numbers", async () => {
    const res = await request(app).get("/subtract?a=10&b=3");

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(7);
  });

  test("GET /multiply should multiply numbers", async () => {
    const res = await request(app).get("/multiply?a=4&b=5");

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(20);
  });

  test("GET /divide should divide numbers", async () => {
    const res = await request(app).get("/divide?a=20&b=5");

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(4);
  });

  test("GET /divide should reject divide by zero", async () => {
    const res = await request(app).get("/divide?a=20&b=0");

    expect(res.statusCode).toBe(400);
  });

  test("GET /add should reject invalid input", async () => {
    const res = await request(app).get("/add?a=x&b=5");

    expect(res.statusCode).toBe(400);
  });

});
