import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import { notFound, errHandler } from "./middlewares/errHandlers.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("./backend/uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use("/api/users/", userRoutes);
app.use("/api/posts/", postRoutes);

app.use(notFound);
app.use(errHandler);

app.listen(process.env.PORT, () => {
  console.log("Server started at PORT:5000");
});
