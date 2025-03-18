/* local DB connection

import pkg from "pg";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const { Pool } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const DBPassword = fs
  .readFileSync(__dirname + "/src/secrets/localDBPassword.txt")
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

*/

import pkg from "pg";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const { Pool } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const DBPassword = fs
  .readFileSync(__dirname + "/src/secrets/deployedDBPassword.txt")
  .toString()
  .trim();

const pool = new Pool({
  host: "aram-postgres-db.c3iyeqag41af.us-east-2.rds.amazonaws.com", // RDS endpoint
  port: 5432,
  database: "aram_guide", // Whatever DB name you set
  user: "master_user", // Your master username
  password: DBPassword,
  ssl: {
    ca: fs.readFileSync("./src/secrets/global-bundle.pem").toString(),
    // rejectUnauthorized: false, // For testing, disables SSL verification
  },
});

export default pool;
