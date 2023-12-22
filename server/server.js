const express = require('express')
const port = 8888;
const cors = require("cors")

app.use(cors())

const app = express()

app.get("/home", (req, res) => {
    res.json({message: "HELLO"})
})

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})