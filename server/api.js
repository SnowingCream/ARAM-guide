import express from "express";
import pool from "./db.js";
import APICall from "./src/APICall.js";
import DBInsert from "./src/DBInsert.js";

import {
  DB_accounts_query,
  DB_match_account_query,
  DB_matches_query,
} from "./src/DBQueries.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ test: "hi from ARAM!!!!!!!!" });
});

router.get("/champion", (req, res) => {
  res.send({ test: "champion detected" });
});

router.post(`/player`, (req, res) => {
  (async () => {
    const DBData = await APICall(req.body, res);
    await DBInsert(DBData);
  })();
});

export default router;
