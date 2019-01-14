const logger = require("winston")
const ws = require("ws")

let instance = null

class SocketServer {
    constructor(server) {
        this._clients = []
        this._server = server
        this._ws = new ws.Server({
            server
        })

        this._ws.on("connection", this.onConnection.bind(this))
    }

    onConnection(socket, req) {
        logger.debug(`client connected from ${req.connection.remoteAddress}`)

        const onMessage = this.onMessage.bind(this, socket)

        this._clients.push(socket)

        socket.on("message", onMessage)

        socket.on("disconnect", () => {
            logger.debug(`client disconnected from ${req.connection.remoteAddress}`)

            socket.off("message", onMessage)
            this._clients.splice(this._clients.indexOf(socket), 1)
        })
    }

    onMessage(socket, data) {
        console.log(data)

        socket.send("yo")
    }
}

module.exports.initialize = (server) => {
    instance = new SocketServer(server)
}

module.exports.get = () => {
    if (!instance) {
        throw new Error("SocketServer is not initialized")
    }

    return instance
}
