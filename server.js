const express = require("express");
const app = express();

const logger = require("./logger/index");

const corsHeaders = require("./middlewares/CorsMiddleware");
const urlLogger = require("./middlewares/UrlLoggingMiddleware");


// Middleware
app.use(express.json());
app.use(corsHeaders);
app.use(urlLogger);

const database = require("./configs/database.config");

const userRouter = require("./routes/UserRoutes");
app.use("/users", userRouter);

const announcementRouter = require("./routes/AnnouncementRoutes");
app.use("/announcements", announcementRouter);

const opportunityRouter = require("./routes/OpportunityRoutes");
app.use("/opportunities", opportunityRouter);

app.get("", (request, response) => {
    response.status(200).send("<h1>Server!</h1>")
})


const port = 3003;

app.listen(port, () => {
    logger.info(`Server running on port: ${port}`);
}) 