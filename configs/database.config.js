const mongoose = require("mongoose");

require("dotenv").config();

const databaseConnectionUrl = process.env.DATABASE_URL;

const mongooseConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(databaseConnectionUrl);

const database = mongoose.connection;

database.on("error", console.error.bind("Database connection error : "));

database.once("open", () => {
    console.log("Connected to database!");
});
