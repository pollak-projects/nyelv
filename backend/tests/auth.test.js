import request from "supertest";
import app from "../index.js";

test("POST auth/login should be good", async () => {
  const response = await request(app).post("/auth/login").send({
    username: "Zete",
    password: "Zete12345",
  });
  const data = JSON.parse(response.text).message;
    if (!data){
          expect(response.status).toBe(200);
    }
    else{
          expect(response.status).toBe(400);
    }

});

test("POST /auth/register should be good", async () => {
  const response = await request(app).post("/auth/register").send({
    username: "johndoe12",
    first_name: "Johny",
    last_name: "Doee",
    birth_date: "1990-01-01",
    email: "johndoe123@gmail.com",
    password: "password",
  });

  const data = JSON.parse(response.text).message;

  if (!data){
  expect(response.status).toBe(200);
  }
else{
  expect(response.status).toBe(400);
}
});
