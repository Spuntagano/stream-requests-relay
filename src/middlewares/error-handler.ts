module.exports = function(err, req, res, next) {
    if (err.log) {
        console.error(`${new Date()}: ${err.message || 'Unexpected error'}`);
        console.error(err.e);
    }

    res.status(err.status || 500).send({
        message: err.message || 'Unexpected error'
    });
};
