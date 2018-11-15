var connections: any = {};

function request(ws) {
    if (!connections[ws.protocol]) connections[ws.protocol] = [];
    connections[ws.protocol].push(ws);
}

function verifyClient(info, next) {
    next(info.origin === process.env.WS_ORIGIN || info.origin === process.env.WSS_ORIGIN);
};

module.exports = {request: request, connections: connections, verifyClient: verifyClient};