const express = require("express");
const app = express();

const logger = require("./logger/index");

const corsHeaders = require("./middlewares/CorsMiddleware");
const urlLogger = require("./middlewares/UrlLoggingMiddleware");

const cookieParser = require('cookie-parser');
const authController = require('./controllers/AuthController')


// Middleware
app.use(express.json());
app.use(corsHeaders);
app.use(urlLogger);
app.use(cookieParser());
// app.use(jwtHelper.validateToken);

const database = require("./configs/database.config");

const authRouter = require("./routes/AuthRoutes");
app.use("/auth", authRouter);

const userRouter = require("./routes/UserRoutes");
app.use("/users", userRouter);

const announcementRouter = require("./routes/AnnouncementRoutes");
app.use("/announcements", authController.validateToken, announcementRouter);

const opportunityRouter = require("./routes/OpportunityRoutes");
app.use("/opportunities", authController.validateToken, opportunityRouter);

const discussionForumRouter = require("./routes/DiscussionForumRoutes");
app.use("/discussion-forum", discussionForumRouter)

app.get("", (request, response) => {
    response.status(200).send("<h1>Server!</h1>")
})


const port = 3333;

app.listen(port, () => {
    logger.info(`Server running on port: ${port}`);
}) 