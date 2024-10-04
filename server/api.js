import express from "express";
import axios from "axios";
import { apiKey, URL_accountByNameAndTag, URL_matchesByPuuid1, URL_matchesByPuuid2, URL_matchByMatchid, EXAMPLE_puuid, EXAMPLE_matchid } from "./var.js";

const router = express.Router();



async function axiosGet(URL) {
    try {
        const response = await axios.get(URL, {
            headers: {
                "X-Riot-Token": apiKey
            }
        });
        // Extract a value from the first API call's response (e.g., `id`)
        const data = response.data;

        // Return the value to be used in the second API call
        return data;

    } catch (error) {
        console.error('Error in API call:', error.message);
        throw error; // Propagate the error so the caller knows something went wrong
    }


};

router.get("/", (req, res) => {
    res.send({ test: "hi from ARAM!!!!!!!!" });
})

router.get("/champion", (req, res) => {
    res.send({ test: "champion detected" });
})

router.post("/player", (req, res) => {

    (async function () {
        try {
            // First call
            const firstURL = URL_accountByNameAndTag + req.body.name + "/" + req.body.tag;
            const firstResult = await axiosGet(firstURL);
            console.log('First API call completed');

            // Second call using the result from the first call
            const secondURL = URL_matchesByPuuid1 + firstResult.puuid + "/" + URL_matchesByPuuid2
            const secondResult = await axiosGet(secondURL);
            console.log('Second API call completed');

            // // Third call using the result from the second call
            const thirdResult = [];
            for (let i = 0; i < secondResult.length; i++) {
                const thirdURL = URL_matchByMatchid + secondResult[i]
                thirdResult.push(await axiosGet(thirdURL));
            }
            console.log('Third API call completed');

            res.send({
                account: {
                    userName: req.body.name,
                    tag: req.body.tag,
                    puuid: firstResult.puuid,
                },
                matchRecords: thirdResult
            });

        } catch (error) {
            res.send(error.message)
        }
    })();
})

export default router;