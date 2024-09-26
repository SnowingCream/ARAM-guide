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
        console.error('Error in first API call:', error.message);
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
            console.log('Result from first API call');

            // Second call using the result from the first call
            const secondURL = URL_matchesByPuuid1 + firstResult.puuid + "/" + URL_matchesByPuuid2
            const secondResult = await axiosGet(secondURL);
            console.log('Result from second API call');

            // starting point tomorrow
            // // Third call using the result from the second call
            // const thirdResult = await makeApiCall(secondResult);
            // console.log('Result from third API call:', thirdResult);

            res.send(secondResult)

        } catch (error) {
            console.error('Error during the API call chain:', error.message);
        }
    })();


    // axios.get(apiURL, {
    //     headers: {
    //         "X-Riot-Token": apiKey
    //     }
    // })
    //     .then(response => {
    //         console.log('Response data:', response.data);
    //         res.send(response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         res.send({
    //             message: "Failed to fetch from Riot API",
    //             error: error
    //         });
    //     });

})

export default router;