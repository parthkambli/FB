import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

//Import Routes
import userRoute from "./routes/user.js";
import recipesRoute from "./routes/recipes.js";
dotenv.config({ path: "./config/config.env" });

connectDB();

// Express App
const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Routes
app.use("/api/user", userRoute);
app.use("/api/recipes", recipesRoute);

const Port = process.env.PORT;

app.listen(Port, console.log(`Server running on port ${Port}`));
