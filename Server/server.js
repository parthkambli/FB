import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//Import Routes
import userRoute from "./routes/user.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

// Express App
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/user", userRoute);

const Port = process.env.PORT;

app.listen(Port, console.log(`Server running on port ${Port}`));
