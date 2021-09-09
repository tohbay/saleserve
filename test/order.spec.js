import request from "supertest";
import { expect } from "chai";

import app from "../src/app";
import db from "../src/models";
import { createTokens } from "../src/helpers";

import { signUpValidUser, signInValidUser,signUpSuperAdminUser, signInSuperAdminUser, DestroyDummyUser, newProduct1 } from './constants'


beforeEach(async () => {
  await db.Product.destroy({ cascade: true, truncate: true });
});

describe("Test Product", () => {
  it.only("returns 201 ok when product is successfully created", async () => {
    const user = await signUpSuperAdminUser();
    await signInSuperAdminUser();
    const userList = await db.User.findAll();
    const savedUser = userList[0];

    const newuser = await db.User.findOne({
      where: { id: savedUser.id },
    });

    const accessToken = createTokens(newuser);

    const response = await request(app)
      .post("/api/v1/products")
      .set("Cookie", [`access-token=${accessToken}`])
      .send(newProduct1);

    await DestroyDummyUser(user);

    expect(response.status).to.eql(201);
  });

    it.only("returns 403 forbidden error message if logged in user creating a product is not a super-admin", async () => {
    const user = await signUpValidUser();
    await signInValidUser();
    const userList = await db.User.findAll();
    const savedUser = userList[0];

    const newuser = await db.User.findOne({
      where: { id: savedUser.id },
    });
    
    const accessToken = createTokens(newuser);

    const response = await request(app)
      .post("/api/v1/products")
      .set("Cookie", [`access-token=${accessToken}`])
      .send(newProduct1);

    await DestroyDummyUser(user);

    expect(newuser.userType).not.to.eql('super-admin');
    expect(response.body.message).to.eql('User not Authorized');
  });
});

