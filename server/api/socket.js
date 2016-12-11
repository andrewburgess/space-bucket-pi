const _        = require('lodash');
const logger   = require('winston');
const SocketIO = require('socket.io');

let instance = null;

class SocketServer {
    constructor(http) {
        this._io = SocketIO(http);
        this._clients = [];

        this._io.on('connection', this.onConnection.bind(this));
    }

    onConnection(socket) {
        logger.debug('client connected');

        this._clients.push(socket);

        socket.on('disconnect', () => {
            logger.debug('client disconnected');

            this._clients.splice(this._clients.indexOf(socket), 1);
        });
    }
    
    send(type, data) {
		this._io.emit(type, data);
	};
}

module.exports.initialize = (http) => {
    instance = new SocketServer(http);
};

module.exports.get = () => {
    if (!instance) {
        throw new Error('SocketServer is not initialized');
    }

    return instance;
};
