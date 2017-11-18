// middleware function to check for logged-in users
const hasSession = function hasSession(req, res, next) {
    console.log('---', req.session, req.cookies);

    if (!req.session.user || !req.cookies.user_sid) {
        return res.redirect('/login');
    }

    next();
};

module.exports = hasSession;
