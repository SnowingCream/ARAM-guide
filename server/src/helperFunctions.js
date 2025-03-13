import axios from "axios";
import assert from "node:assert";
import { apiKey } from "./constants.js";

// round function for arithmetic division handling
function round(value, digitAfterDecimal, percent = true) {
  if (percent) {
    return (
      Math.round(value * 10 ** (digitAfterDecimal + 2)) /
      10 ** digitAfterDecimal
    );
  } else {
    return (
      Math.round(value * 10 ** digitAfterDecimal) / 10 ** digitAfterDecimal
    );
  }
}

// sleep function to handle rate limit
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// GET call using axios
async function axiosGet(URL) {
  assert(URL, "URL is required");

  try {
    const response = await axios.get(URL, {
      headers: {
        "X-Riot-Token": apiKey,
      },
    });
    // Extract a value from the API call's response
    const data = response.data;
    return data;
  } catch (error) {
    // Instead of handling the error here, rethrow it (propagate up) to the higher level
    // the process doesn't stop here!
    console.log("Given URL: ", URL);
    throw new Error(`axiosGet() failed: ${error.message}`);
  }
}

export { round, sleep, axiosGet };
