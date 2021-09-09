import express from "express";

import userAPI from "./services/auth";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to saleserve API 👍🏼 🌍 ⚡️ 🥂 🏆",
  });
});

router.use("/auth", userAPI);

export default router;