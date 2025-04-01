import {
  URL_accountByNameAndTag,
  URL_matchByMatchid,
  URL_matchesByPuuid1,
  URL_matchesByPuuid2,
} from "./URLComponents.js";

import { sleep, axiosGet } from "./helperFunctions.js";

// user name + tag -> corresponding puuid
async function firstAPICall(accountServer, playerName, playerTag) {
  const URL =
    "https://" +
    accountServer +
    URL_accountByNameAndTag +
    playerName +
    "/" +
    playerTag;

  try {
    const result = await axiosGet(URL);
    console.log("First API call completed");
    return result;
  } catch (error) {
    throw new Error(`firstAPICall() failed: ${error.message}`);
  }
}

// puuid -> match id list
async function secondAPICall(matchServer, puuid) {
  const URL =
    "https://" +
    matchServer +
    URL_matchesByPuuid1 +
    puuid +
    "/" +
    URL_matchesByPuuid2;
  try {
    const result = await axiosGet(URL);
    console.log("Second API call completed");
    return result;
  } catch (error) {
    throw new Error(`secondAPICall() failed: ${error.message}`);
  }
}

/*
match id list -> match detail list
batch API call in parallel
API rate limit is 20 per sec = maximum value of batchSize
*/
async function thirdAPICall(matchIDs, matchServer, batchSize) {
  const result = [];
  try {
    // batchSize amount of API calls in parallel
    for (let i = 0; i < matchIDs.length; i += batchSize) {
      const batch = matchIDs.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((matchID) => {
          const URL = "https://" + matchServer + URL_matchByMatchid + matchID;
          return axiosGet(URL);
        })
      );
      result.push(...batchResults);
      console.log(
        `record ${i + 1} ~ ${Math.min(
          i + batchSize,
          matchIDs.length
        )} has been done!`
      );
      await sleep(1000);
    }
    console.log("Third API call completed");
    return result;
  } catch (error) {
    throw new Error(`thirdAPICall() failed: ${error.message}`);
  }
}

// match detail list -> make sure all matches are at least version 14.
async function versionCheck(matchDetails) {
  // check if there is a match of which version is less than 14.
  let lastIndex = -1;
  for (let i = 0; i < matchDetails.length; i++) {
    const version = parseInt(matchDetails[i].info.gameVersion.split(".")[0]);
    if (version < 14) {
      lastIndex = i;
      break;
    }
  }

  // if so, cut the list off from that match.
  if (lastIndex != -1) {
    console.log(
      `Third API call processed: removed ${
        thirdResult.length - lastIndex
      } records that are before version 14`
    );
    matchDetails = matchDetails.slice(0, lastIndex);
    return matchDetails;
  } else {
    console.log("Third API call processed: all records are valid");
    return matchDetails;
  }
}

// a caller function of 4 functions, which will be called in order.
// must return the last result after sending it to the frontend, because DB flow also needs it.
async function flow(userInfo, res, ws = null) {
  try {
    if (ws)
      ws.send(
        JSON.stringify({
          type: "progress",
          progress: 10,
          message: "Started the flow...",
        })
      );

    const firstResult = await firstAPICall(
      userInfo.accountServer,
      userInfo.name,
      userInfo.tag
    );

    if (ws)
      ws.send(
        JSON.stringify({
          type: "progress",
          progress: 30,
          message: "Fetched account info...",
        })
      );
    const secondResult = await secondAPICall(
      userInfo.matchServer,
      firstResult.puuid
    );
    if (ws)
      ws.send(
        JSON.stringify({
          type: "progress",
          progress: 50,
          message: "Fetched match IDs...",
        })
      );
    await sleep(1000);
    const startTime = performance.now(); // Record start time
    const thirdResult = await thirdAPICall(
      secondResult,
      userInfo.matchServer,
      20
    ); // Batch size of 20
    if (ws)
      ws.send(
        JSON.stringify({
          type: "progress",
          progress: 80,
          message: "Fetched match details",
        })
      );
    const endTime = performance.now(); // Record end time
    console.log(
      `Batch API calls execution time: ${(endTime - startTime).toFixed(
        2
      )} milliseconds`
    );
    const finalResult = await versionCheck(thirdResult);
    if (ws)
      ws.send(
        JSON.stringify({
          type: "progress",
          progress: 95,
          message: "Version check completed",
        })
      );
    res.send({
      account: {
        userName: userInfo.name,
        tag: userInfo.tag,
        puuid: firstResult.puuid,
      },
      matchRecords: finalResult,
    });
    if (ws)
      ws.send(
        JSON.stringify({ type: "progress", progress: 100, message: "Done!" })
      );
    console.log("API call successfully completed");
    return finalResult;
  } catch (error) {
    res.send(error.message);
    if (ws)
      ws.send(
        JSON.stringify({
          type: "progress",
          progress: -1,
          message: "Error: " + error.message,
        })
      );
    console.error(`post request (the main flow) failed: ${error.message}`);
  }
}

export default flow;
