const express = require("express");

// Enable ..env files.
require("dotenv").config();

// MongoDB object modeling tool.
const mongoose = require("mongoose");

// HTTP request logger middleware.
const morgan = require("morgan");

// Parse incoming request bodies in a middleware before the handlers.
const bodyParser = require("body-parser");

// Enable CORS.
const cors = require("cors");

// Synchronously read the contents of a given directory. Returns an array with all the file names or objects in the directory.
const { readdirSync } = require("fs");

// app
const app = express();

// db
mongoose
    .connect(process.env.MONGO_URI, {
    //Configurations. Lookup in the Mongoose documentation. 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(morgan("dev"));
//This line limits the amount of data the client can send.
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
//Instead of calling every route separately we use this syntax. Read the routes directory. Prefix with "/api".
readdirSync("./routes").map((route) => app.use("/api", require("./routes/" + route)));

// port
const port = process.env.PORT || 8001;

app.listen(port, () => console.log(`Server is running on port ${port}`));
