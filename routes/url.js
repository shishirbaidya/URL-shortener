// routes/url.js
const express = require('express');
const URL = require('../models/url');
const { newShortURL, handleGetAnalytics } = require('../controllers/url');


const router = express.Router();

router.post("/", newShortURL);

router.get("/analytics/:shortid", async (req, res) => {

    const shortId = req.params.shortid;

    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
});

module.exports = router;
