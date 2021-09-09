import request from "supertest";
import { expect } from "chai";

import app from "../src/app";
import db from "../src/models";

import { signUpValidUser, signInValidUser, signOutValidUser, DestroyDummyUser } from './constants'

beforeEach(async () => {
  await db.User.destroy({ cascade: true, truncate: true });
});

describe("User Signup", () => {
  it("returns 201 ok when signup request is valid", async () => {
    const response = await signUpValidUser();
    expect(response.status).to.eql(201);
  });

  it("returns success message when signup request is valid", async () => {
    const response = await signUpValidUser();
    expect(response.body.message).to.eql("User successfully created");
  });

  it("saves the user to database", async () => {
    await signUpValidUser();
    const userList = await db.user.findAll();
    expect(userList.length).to.eql(1);
  });

  it("saves the username and email to database", async () => {
    await signUpValidUser();
    const userList = await db.user.findAll();
    const savedUser = userList[0];
    expect(savedUser.email).to.eql("test@test.com");
  });

  it("hashes the password in database", async () => {
    await signUpValidUser();
    const userList = await db.user.findAll();
    const savedUser = userList[0];
    expect(savedUser.password).not.to.eql("password");
  });
});

describe("User SignIn", () => {
  it("returns 200 ok when login request is valid", async () => {
    const user = await signUpValidUser();
    const response = await signInValidUser();

    DestroyDummyUser(user);
    expect(response.status).to.eql(200);
  });

  it("returns success message when signup request is valid", async () => {
    const user = await signUpValidUser();
    const response = await signInValidUser();

    DestroyDummyUser(user);

    expect(response.body.message).to.eql("User successfully signed in");
  });
});

describe("User SignOut", () => {
  it("returns 200 ok on successful sign out", async () => {
    const user = await signUpValidUser();
    await signInValidUser();
    const response = await signOutValidUser();

    expect(response.status).to.eql(200);
  });

  it("returns error message when creating accout request is not valid because there is no user cookie", async () => {
    const user = await signUpValidUser();
    await signInValidUser();

    DestroyDummyUser(user);

    const response = await request(app).post("/api/v1/accounts");

    expect(response.body.message).to.eql("User not Authenticated");
  });
});


