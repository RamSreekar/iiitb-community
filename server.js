const express = require("express")
const app = express() 

const database = require("./configs/DatabaseConfig")

const userRouter = require("./routes/userRoutes");
app.use("/users", userRouter);

app.get("", (request, response) => {
    response.status(200).send("<h1>Server!</h1>")
})

app.listen(9000, () => {
    console.log("Server running!")
}) 