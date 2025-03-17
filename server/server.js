import express from "express";
import test from "./api.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 4001;

// configuration from .env file, which is generated from deploy-local.sh
dotenv.config();

app.use(express.json());

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
