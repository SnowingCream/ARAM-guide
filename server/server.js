import express from "express";
import test from "./api.js";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import path from "path";

const app = express();
const port = 4001;

// configuration from .env file, which is generated from deploy-local.sh
dotenv.config();

app.use(express.json());

// === Morgan setup ===

// 1. Create a write stream (in append mode) for saving logs to file
const accessLogStream = fs.createWriteStream(path.join("/app", "access.log"), {
  flags: "a",
});

// 2. Set up morgan middleware: log to console + file
app.use(
  morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    { stream: accessLogStream }
  )
);

// Allow frontend server's IP
// CORS middleware must be applied before routes
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN, // Frontend server's public IP
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", test);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
