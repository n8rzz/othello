// middleware function to check for logged-in users
const hasSession = function hasSession(req, res, next) {
    if (!req.session.id || !req.session.userToken) {
        return res.redirect('/login');
    }

    next();
};

module.exports = hasSession;
