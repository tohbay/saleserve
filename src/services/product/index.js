import express from "express";

import { authorization, checkSuperAdminAuthorization } from '../../helpers';
import { addProduct, getAllProducts } from "./product.service";

const router = express.Router();

router.post("/", authorization, checkSuperAdminAuthorization, addProduct);
router.get("/", getAllProducts);


export default router;
