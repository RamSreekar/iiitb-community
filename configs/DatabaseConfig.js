const mongoose = require("mongoose");

// const databaseUrl = process.env.DATABASE_URL;
 
const databaseUrl = "mongodb+srv://ramsreekar0929:nDES3z1zdezwYH0j@mycluster.wtgx0.mongodb.net/test?retryWrites=true&w=majority";
const databaseConnectionUrl = databaseUrl.toString()

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
