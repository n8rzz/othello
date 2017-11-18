// This middleware will check if user's cookie is still saved in browser and user
// is not set, then automatically log the user out. This usually happens when you
// stop your express server after login, your cookie still remains saved in the browser.
const staleCookieMiddleware = function staleCookieMiddleware(req, res, next) {
    if (req.cookie && req.cookies.user_sid && !req.session.user) {
        // TODO: move to app-level constant
        res.clearCookie('user_sid');
    }

    next();
}

module.exports = staleCookieMiddleware;
