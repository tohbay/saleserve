import request from "supertest";

import app from "../../src/app";

export const signInValidUser = async () => {
  return await request(app)
    .post("/api/v1/auth/signin")
    .send({ email: "test@test.com", password: "test1234" });
};

export const signUpValidUser = async () => {
  return await request(app).post("/api/v1/auth/signup").send({
    username: "test1234",
    email: "test@test.com",
    password: "test1234",
  });
};

export const signUpSuperAdminUser = async () => {
  return await request(app).post("/api/v1/auth/signup").send({
    username: "superadmin",
    email: "superadmin@test.com",
    password: "superadmin",
    userType: 'super-admin'
  });
};
export const signInSuperAdminUser = async () => {
  return await request(app).post("/api/v1/auth/signin").send({
    email: "superadmin@test.com",
    password: "superadmin",
  });
};

export const signOutValidUser = async () => {
  return await request(app).post("/api/v1/auth/signout");
};

export const getAllUsers = async () => {
  return await request(app).get("/api/v1/users");
};
export async function DestroyDummyUser(user) {
  return await user.destroy({ force: true });
}

export const newProduct1 = {
  title: 'Dell Inspiron',
  description: 'The latest laptop for 2020',
  category: 'laptop',
  price: 50.00,
  quantity: 5  
}