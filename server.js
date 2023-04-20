const express = require("express")
const app = express() 

const database = require("./configs/DatabaseConfig")

const userRouter = require("./routes/UserRoutes");
app.use("/users", userRouter);

app.get("", (request, response) => {
    response.status(200).send("<h1>Server!</h1>")
})

app.listen(3003, () => {
    console.log("Server running!")
}) 