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

router.post("/player", async (req, res) => {
  try {
    const ws = req.ws || null; // ✅ safely extract WebSocket from request
    const DBData = await APICall(req.body, res, ws); // ✅ explicitly pass ws
    await DBInsert(DBData);
  } catch (error) {
    console.error("Error in /player route:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
