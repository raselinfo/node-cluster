const express = require("express")
const app = express()
const fiboObj = require("./math-logic/fibonacci-series")
const cluster = require("cluster")
const totalCPUs = require("os").cpus().length

if (cluster.isMaster) {
    console.log(`Total number of CPU counts is ${totalCPUs}`)

    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork()
    }
    cluster.on("online", worker => {
        console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid}`)
    })
    cluster.on("exit", worker => {
        console.log(`Worker id ${worker.id} and PID is ${worker.process.pid} is offline`)
        console.log("Let's foork new worker!")
        cluster.fork()
    })
}
else {
    app.get("/", (req, res) => {
      console.log(`Worker process id - ${cluster.worker.process.pid} has accepted the request`)
        const result = fiboObj.calculateFibonacciSeries(Number.parseInt(req.query.number))
        res.send(`<h1>${result}</h1>`)
    })
    app.listen(4000, () => {
        console.log("http://localhost:4000")
    })
}