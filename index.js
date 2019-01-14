require("dotenv").config()

const logger = require("winston")

const server = require("./server")
const pkg = require("./package.json")

logger.level = process.env.LOG_LEVEL || "info"
logger.add(
    new logger.transports.Console({
        format: logger.format.simple()
    })
)

logger.info(`SPACEBUCKET v${pkg.version}\n\n`)

server.start()
