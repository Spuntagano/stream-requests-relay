var connections = require('../lib/connections');

module.exports = (ws) => {
    connections.addConnection(ws);
};
