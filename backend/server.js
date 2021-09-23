import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import { notFound, errHandler } from "./middlewares/errHandlers.js";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

connectDb();

const app = express();

app.use(express.json());

app.use("/api/users/", userRoutes);
app.use("/api/posts/", postRoutes);

app.use(notFound);
app.use(errHandler);

app.listen(process.env.PORT, () => {
  console.log("Server started at PORT:5000");
});
