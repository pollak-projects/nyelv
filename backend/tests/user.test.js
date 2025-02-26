import request from "supertest";
import app from "../index.js";

test("POST user/add should be good", async () => {
  const response = await request(app).post("/user/add").send({
    username: "johndoe12",
    first_name: "Johny",
    last_name: "Doee",
    birth_date: "1990-01-01",
    email: "johndoe123@gmail.com",
    password: "password",
  });

  const data = JSON.parse(response.text).message;

  if (!data) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(409);
  }
});

test("GET user/getAll should be good", async () => {
  const response = await request(app).get("/user/getAll").send();

  const data = JSON.parse(response.text).message;

  if (!data) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(409);
  }
});

test("GET user/getProgress should be good", async () => {
  const response = await request(app)
    .get("/user/getProgress/?username=Zete")
    .send();

  const data = JSON.parse(response.text).message;

  if (!data) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(409);
  }
});

test("DELETE user/delete should be good", async () => {
  const response = await request(app).delete("/user/delete/?id=1").send();

  const data = response.text;

  if (!data) {
    expect(response.status).toBe(204);
  } else {
    expect(response.status).toBe(409);
  }
});

test("PUT user/update should be good", async () => {
  const response = await request(app).put("/user/update/?id=2").send({
    password: "password",
    email: "zsinasdasd@gmail.com",
  });

  const data = JSON.parse(response.text).message;

  if (data) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(409);
  }
});

test("GET user/getUserLevel should be good", async () => {
  const response = await request(app)
    .get("/user/getUserLevel/?username=Zete")
    .send();

  const data = JSON.parse(response.text).message;

  if (!data) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(409);
  }
});

test("PUT user/setUserProgress should be good", async () => {
    const response = await request(app)
        .put("/user/setUserProgress/?username=Zete")
        .send({
            user_current_progress: 60,
        });
    
    const data = response.text;
    
    if (!data) {
        expect(response.status).toBe(200);
    } else {
        expect(response.status).toBe(404);
    }
    });

test("PUT user/setUserLevel should be good", async () => {
  const response = await request(app).put("/user/setUserLevel/?username=Zete").send({
    level: "beginner",
  });

  const data = response.text;

  if (data) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(404);
  }
});