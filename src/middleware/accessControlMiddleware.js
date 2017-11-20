const accessControlMiddleware = function accessControlMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://${req.headers.host}:${process.env.PORT}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
}

module.exports = accessControlMiddleware;
