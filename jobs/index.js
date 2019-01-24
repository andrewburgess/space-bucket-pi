const Cron = require("cron")

const SocketServer = require("../server/socket")

const Camera = require("./camera")
const Environment = require("./environment")

module.exports.start = () => {
    const server = SocketServer.get()
    const cronjob = new Cron.CronJob(process.env.CRON, () => {
        Promise.all([Camera.captureImage(), Environment.saveReadings()]).then(() => {
            server.send({
                type: "CRON"
            })
        })
    })

    cronjob.start()
    Environment.startReadings()
}
