import express from "express";
import test from "./api.js";

const app = express();
const port = 4000;

app.use("/api", test);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
