import express from "express";
const morgan = require("morgan");
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import api from "./api-gateway";
import { notFound, errorHandler } from "./middleware/apiErrorHandlers";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", function (req, res) {
  res.redirect("https://github.com/tohbay/saleserve");
});

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export default app;