import request from "supertest";
import app from "../index.js";

test("GET quiz/getAllTask should be good", async () => {
  const response = await request(app).get("/quiz/getAllTask").send();

  const data = JSON.parse(response.text).message;

  if (!data) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(409);
  }
});

test("GET quiz/getAllPair should be good", async () => {
  const response = await request(app).get("/quiz/getAllPair").send();

  const data = JSON.parse(response.text).message;

  if (!data) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(409);
  }
});


test("GET quiz/getAllListening should be good", async () => {
  const response = await request(app).get("/quiz/getAllListening").send();

  const data = JSON.parse(response.text).message;

  if (!data) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(409);
  }
});
