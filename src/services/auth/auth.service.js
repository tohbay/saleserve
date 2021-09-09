import "regenerator-runtime/runtime";
import db from "../../models";
import bcrypt from "bcrypt";
import { asyncHandler } from "../../helpers";
import validate from "validate.js";
import { signupConstraints, signinConstraints } from "../../constants";
import { createTokens } from "../../helpers";

const saltRounds = 10;

const userSignup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const validation = validate({ username, email, password }, signupConstraints);
  if (validation) return res.status(400).json({ error: validation });

  try {
    const serviceOperation = await db.sequelize.transaction(
      async (transaction) => {
        const checkUserExists = await db.User.findOne(
          {
            where: { email: email },
          },
          {
            transaction: transaction,
          }
        );
        if (checkUserExists)
          return res
            .status(409)
            .json({ error: true, message: "User already exist" });

        const hash = await bcrypt.hash(password, saltRounds);
        await db.User.create(
          { username, email, password: hash },
          {
            transaction: transaction,
          }
        );
        return res.status(201).json({
          success: true,
          message: "User successfully created",
          data: { username, email },
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Ooops, Something went wrong. Please contact admin for support",
    });
  }
});

const userSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const validation = validate({ email, password }, signinConstraints);
  if (validation) return res.status(400).json({ error: validation });

  try {
    const serviceOperation = await db.sequelize.transaction(
      async (transaction) => {
        const user = await db.User.findOne(
          { where: { email: email } },
          {
            transaction: transaction,
          }
        );
        if (!user)
          return res.status(400).json({
            error: true,
            message: "User not found",
          });

        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword === false)
          return res.status(400).json({
            error: true,
            message: "Unable to login, ensure you have valid credentials",
          });

        const accessToken = createTokens(user);
        res.cookie("access-token", accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 365,
          httpOnly: true,
        });

        return res.status(200).json({
          success: true,
          message: "User successfully signed in",
        });
      }
    );
  } catch (error) {
    console.log('***********', error)
    return res.status(500).json({
      error: true,
      message: "Ooops, Something went wrong. Please contact admin for support",
    });
  }
});

const userSignout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("access-token");

    return res.status(200).json({
      success: true,
      message: "User successfully signed out",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message:
        "Ooops, Ooops, Something went wrong. Please contact admin for support. Please contact admin for support",
    });
  }
});

export { userSignup, userSignin, userSignout };
