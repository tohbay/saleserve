import express from "express";
import { userSignup, userSignin, userSignout } from "./auth.service";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.post("/signout", userSignout);

export default router;
