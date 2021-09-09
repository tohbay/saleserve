import request from "supertest";

import app from "../../src/app";

export const signInValidUser = async () => {
  return await request(app)
    .post("/api/v1/users/auth/signin")
    .send({ email: "test@test.com", password: "test1234" });
};

export const signUpValidUser = async () => {
  return await request(app).post("/api/v1/users/auth/signup").send({
    username: "test1234",
    email: "test@test.com",
    password: "test1234",
  });
};

export const signOutValidUser = async () => {
  return await request(app).post("/api/v1/users/auth/signout");
};

export const getAllUsers = async () => {
  return await request(app).get("/api/v1/users");
};
export async function DestroyDummyUser(user) {
  return await user.destroy({ force: true });
}