const bodyParser = require("body-parser")
const compression = require("compression")
const express = require("express")
const http = require("http")
const logger = require("winston")

const initializeSocketServer = require("./socket").initialize

const app = express()
const server = http.createServer(app)

app.disable("x-powered-by")
app.use(bodyParser.json())
app.use(compression())

app.get("/", (req, res) => res.send("hi"))

module.exports.start = () =>
    new Promise((resolve, reject) => {
        initializeSocketServer(server)

        server.on("listening", () => {
            logger.info(`server listening on 0.0.0.0:${process.env.PORT || 3001}`)
            return resolve()
        })

        server.on("error", (err) => {
            logger.error(err)
            return reject(err)
        })

        server.listen(process.env.PORT || 3001, "0.0.0.0")
    })
