const express = require("express")
const app = express()

app.get("", (request, response) => {
    response.status(200).send("<h1>Server!</h1>")
})

app.listen(9999, () => {
    console.log("Server running!")
})