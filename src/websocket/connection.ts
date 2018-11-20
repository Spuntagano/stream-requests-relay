var connections: any = {};

var connection = function(ws) {
    if (!connections[ws.protocol]) connections[ws.protocol] = [];
    connections[ws.protocol].push(ws);
};

var verifyClient = function(info, next) {
    next(info.origin === process.env.WS_ORIGIN || info.origin === process.env.WSS_ORIGIN);
};

module.exports = {request: connection, connections: connections, verifyClient: verifyClient};