import express from "express";

import { authorization, checkSuperAdminAuthorization } from '../../helpers';
import { addProduct } from "./product.service";

const router = express.Router();

router.post("/", authorization, checkSuperAdminAuthorization, addProduct);


export default router;
