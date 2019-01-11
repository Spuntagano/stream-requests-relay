module.exports = function(info, next) {
    next(info.origin === process.env.WS_ORIGIN);
};