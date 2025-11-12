// routes/url.js
const express = require('express');
const { newShortURL, handleGetAnalytics } = require('../controllers/url');


const router = express.Router();

router.post("/", newShortURL);

router.get("/analytics/:shortid", handleGetAnalytics);

module.exports = router;
