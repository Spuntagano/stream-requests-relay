module.exports = function(info, next) {
    next(process.env.WS_ORIGIN.split(',').indexOf(info.origin) !== -1);
};