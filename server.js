const express = require("express");
const app = express();

app.use(express.json());

const database = require("./configs/DatabaseConfig");

const userRouter = require("./routes/UserRoutes");
app.use("/users", userRouter);

const announcementRouter = require("./routes/AnnouncementRoutes");
app.use("/announcements", announcementRouter);

app.get("", (request, response) => {
    response.status(200).send("<h1>Server!</h1>")
})

const port = 3003;

app.listen(port, () => {
    console.log("Server running on port: "+port);
}) 