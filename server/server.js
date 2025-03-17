import express from "express";
import test from "./api.js";
import cors from "cors";

const app = express();
const port = 4001;

app.use(express.json());

// Allow frontend server's IP
// CORS middleware must be applied before routes
app.use(
  cors({
    origin: "http://3.138.68.148", // Frontend public IP
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", test);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
