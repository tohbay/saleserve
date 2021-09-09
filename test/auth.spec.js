import { expect } from "chai";

import db from "../src/models";

import { signUpValidUser, signInValidUser, signOutValidUser, DestroyDummyUser } from './constants'

beforeEach(async () => {
  await db.User.destroy({ cascade: true, truncate: true });
});

describe("User Signup", () => {
  
  it("returns 201 ok when signup request is valid", async () => {
    const response = await signUpValidUser();

    console.log(response.body)

    expect(response.status).to.eql(201);
    expect(response.body.message).to.eql("User successfully created");
  });
  
  it("returns a 409 error message when signup with existing user credentials", async () => {
    const response = await signUpValidUser();

    expect(response.status).to.eql(409);
    expect(response.body.message).to.eql("User already exist");
  });

  it("saves the user to database", async () => {
    await signUpValidUser();
    const userList = await db.User.findAll();
    expect(userList.length).to.eql(1);
  });

  it("saves the username and email to database", async () => {
    await signUpValidUser();
    const userList = await db.User.findAll();
    const savedUser = userList[0];

    expect(savedUser.email).to.eql("test@test.com");
  });

  it("hashes the password in database", async () => {
    await signUpValidUser();
    const userList = await db.User.findAll();
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
    const {
    username,
    email,
    password
  } = user;
    await signInValidUser({
    username,
    email,
    password
  });
    const response = await signOutValidUser();

    expect(response.status).to.eql(200);
  });
});


