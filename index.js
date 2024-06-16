const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const path = require("path");
app.use(cors());
require("dotenv").config();

app.get("/api/:category/:page/:numPerPage", async (req, res) => {
    try {
        // gets the api key from .env. need to keep it a secret
        const APIKey = process.env.PIXABAY_API_KEY;

        // setting up variables sent from the client
        const category = req.params.category;
        const page = req.params.page;
        const perPage = req.params.numPerPage;

        // will fetch form the api provided with the data sent from the client
        const response = await axios.get(
            `https://pixabay.com/api/?key=${APIKey}&q=${category}&per_page=${perPage}&page=${page}`
        );

        const data = response.data;

        // will a variable for knowing how many pages can be produced by the received data
        const maxPage = (data.totalHits / 9).toFixed();

        // send the data away to the client
        res.json({ Message: "successful", category, page, maxPage, data });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// set the server to listen at port 5000
app.listen(5000, () => {
    console.log("server started on port 5000");
});

// have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "client/build")));

// all other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
