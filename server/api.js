import express from "express";
import APICall from "./src/APICall.js";
import DBInsert from "./src/DBInsert.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("HI from ARAM GUIDE!!!!!!!!");
});

router.get("/champion", (req, res) => {
  res.send("CHAMPION ENDPOINT DETECTED!!!");
});

router.post(`/player`, (req, res) => {
  (async () => {
    const DBData = await APICall(req.body, res);
    await DBInsert(DBData);
  })();
});

export default router;
