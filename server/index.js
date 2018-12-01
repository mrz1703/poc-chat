/**
 * @module index
 */

'use strict';

require('dotenv').load();

const server = require('http').createServer();
const io     = require('socket.io')(server);
io.origins('*:*') 

/**
 * Port to listen to
 * @type {Number}
 */
const HTTP_PORT = process.env.HTTP_PORT || 3030;

/**
 * Connected users' IDs
 * @type {Set}
 */
const users = new Set();

/**
 * Array with chat history
 * @type {Array}
 */
const localHistory = [];
const generalHistory = [];

/**
 * Here comes the socket management part
 */
io.on('connection', function (sock) {

    sock.emit('user:id', sock.id);
    sock.emit('user:list', [...users]);
    sock.emit('msg:local:history', localHistory);
    sock.emit('msg:general:history', generalHistory);

    users.add(sock.id);
    sock.broadcast.emit('user:new', sock.id);

    sock.on('msg:local', function (msg) {
        localHistory.push(msg);
        sock.broadcast.emit('msg:local', msg);
    });

    sock.on('msg:general', function (msg) {
        // Here comes NSQ logic
        localHistory.push(msg);
        sock.broadcast.emit('msg:general', msg);
    });

    sock.on('disconnect', function () {
        users.delete(sock.id);
        sock.broadcast.emit('user:disconnect', sock.id);
    });
});

/**
 * Start HTTP server after setting up
 */
server.listen(HTTP_PORT, function () {
    console.log('server is listening on %d', HTTP_PORT);
});
