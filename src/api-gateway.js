import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to saleserve API 👍🏼 🌍 ⚡️ 🥂 🏆",
  });
});

export default router;