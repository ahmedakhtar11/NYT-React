const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

mongoose.Promise = require("bluebird");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/NYTArticles", 
    (err) => err ? 
        console.log(`Error, could not connect to the database!`) : 
        console.log(`Sucessfully Connected to the database!`));

const port = process.env.PORT || 3000;

app.use(bodyParser({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("client/build"));

app.get("/", (req, res) => {
     res.sendFile(path.join(_dirname, "./client/build/index.html"));
})

require("./routes/api")(app);

app.listen(port, 
    () => console.log(`App Listening on LocalHost: ${port}`));