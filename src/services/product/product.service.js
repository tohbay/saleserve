import "regenerator-runtime/runtime";

import db from "../../models";
import {asyncHandler} from "../../helpers";
import validate from "validate.js";
import { addProductContraints } from "../../constants";

const addProduct = asyncHandler(async (req, res) => {
  const {   title,
  description,
  category,
  price,
  quantity,  } = req.body;

  const validation = validate({ title,
  description,
  category,
  price,
  quantity,  }, addProductContraints);
  if (validation) return res.status(400).json({ error: validation });

  try {
    const serviceOperation = await db.sequelize.transaction(
      async (transaction) => {
        const newProduct = await db.Product.create(
          {   title,
  description,
  category,
  price,
  quantity,  },
          {
            transaction: transaction,
          }
        );
        return res.status(201).json({
          success: true,
          message: "Product successfully added",
          data: newProduct,
        });
      }
    );
  } catch (error) {
    console.log('>>>>>>>>>>>>>>', error.message)
    return res.status(500).json({
      error: true,
      message: "Ooops, Something went wrong. Please contact admin for support",
    });
  }
});

export { addProduct };
