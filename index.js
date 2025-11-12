const express = require('express');
const { connectToMongoDB } = require('./connect');
const router = require("./routes/url");
const URL = require('./models/url');
const app = express();

const PORT = 8080;

app.use(express.json());

connectToMongoDB('mongodb://localhost:27017/shorturl')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

//init route
app.use("/url", router);

app.get("/:shortid", async (req, res) => {
    const shortId = req.params.shortid

    const entry = await URL.findOneAndUpdate({

        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() },
        }
    })
    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => {
    console.log("Server started on : 'localhost:8080' ");
});

