import pkg from "pg";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const { Pool } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const DBPassword = fs
  .readFileSync(__dirname + "/dbPassword.txt")
  .toString()
  .trim();

const pool = new Pool({
  user: "john",
  host: "localhost",
  database: "aram",
  password: DBPassword,
  port: 5432, // Default PostgreSQL port
  // /opt/homebrew/var/postgresql@14/postgresql.conf -> changed to ssl=off. turn it back on for actual deployment.
  ssl: false, // must be set to true with valid ssl certificate for deployment
});

export default pool;
