const express = require("express")
const app = express()
const fiboObj = require("./math-logic/fibonacci-series")



app.get("/", (req, res) => {
    console.log(`Worker process id - ${process.pid} has accepted the request`)
    const result = fiboObj.calculateFibonacciSeries(Number.parseInt(req.query.number))
    res.send(`<h1>${result}</h1>`)
})
app.listen(4000, () => {
    console.log("http://localhost:4000")
})
